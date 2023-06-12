<script>
    import Button, { Label } from "@smui/button";
    import { onMount } from "svelte";
    import {
        parseFloors,
        parseStore,
        etherToWei,
        weiToEther,
    } from "../../utils";
    import { blockchain } from "../../blockchain";
    import Navbar from "../../components/UI/Navbar.svelte";
    import Dialog, { Header, Title, Actions, Content } from "@smui/dialog";
    import IconButton from "@smui/icon-button";
    import Switch from "@smui/switch";
    import FormField from "@smui/form-field";
    import GiMoneyStack from "svelte-icons/gi/GiMoneyStack.svelte";
    import Textfield from "@smui/textfield";
    import Icon from "@smui/textfield/icon";
    import HelperText from "@smui/textfield/helper-text";
    import Error from "../../components/UI/Error.svelte";
    import UploadModal from "../../components/UI/UploadModal.svelte";

    let floors = [];
    const statusClr = ["#f72585", "#8a2ce2", "#131699", "#767778", "#302434"];

    const resetCurrentStore = () =>
        (currentStore = { price: null, rent: null });

    const getColor = (store) => {
        if (store?.isSaleable && store?.isRentable) {
            return statusClr[2];
        } else if (store?.isSaleable) {
            return statusClr[0];
        } else if (store?.isRentable) {
            return statusClr[1];
        } else {
            return statusClr[3];
        }
    };

    onMount(() => getFloors());

    const getFloors = async (blockchain) => {
        if (blockchain?.contract && blockchain.accounts) {
            const data = await blockchain.contract.methods
                .getAllStores()
                .call({ from: blockchain.accounts[0] });
            console.log("data: ", data);
            floors = parseFloors(data);
            console.log("floors: ", floors);
        }
    };

    $: getFloors($blockchain);

    const buyLand = async () => {
        try {
            console.log("floor num ", currentFloor);
            const res = await $blockchain.contract.methods
                .buy(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.tokenId
                )
                .send({
                    from: $blockchain.accounts[0],
                    value: +currentStore.price,
                    gasPrice: 10,
                })
                .on("confirmation", function (confirmationNumber, receipt) {
                    console.log("on confirmation");
                    getFloors($blockchain);
                });

            modalOpen = false;
            resetCurrentStore();
            currentFloor = null;
            console.log("buy land res : ", res);
        } catch (error) {
            console.log("error buy land: ", error);
        }
    };

    const rentLand = async () => {
        try {
            const res = await $blockchain.contract.methods
                .rent(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.tokenId,
                    1
                )
                .send({
                    from: $blockchain.accounts[0],
                    value: +currentStore.rent,
                    gasPrice: 10,
                }).on("confirmation", function (confirmationNumber, receipt) {
                    console.log("on confirmation");
                    getFloors($blockchain);
                });
            modalOpen = false;
            resetCurrentStore();
            currentFloor = null;
            console.log("rent land res: ", res);
        } catch (error) {
            console.log("error rent land: ", error);
        }
    };

    const saveDetails = async () => {
        try {
            await $blockchain.contract.methods
                .setPrice(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.rent
                )
                .send({ from: $blockchain.accounts[0] });

            await $blockchain.contract.methods
                .setRentFee(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.price
                )
                .send({ from: $blockchain.accounts[0] });

            await $blockchain.contract.methods
                .setSaleable(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.isRentable
                )
                .send({ from: $blockchain.accounts[0] });

            await $blockchain.contract.methods
                .setRentable(
                    currentFloor,
                    currentStore.storeNumber,
                    currentStore.isSaleable
                )
                .send({ from: $blockchain.accounts[0] });
            
            getFloors($blockchain);
        } catch (error) {
            console.log("error save details: ", error);
        }
    };

    const setStore = async (store) => {
        const str = await $blockchain.contract.methods
            .getStoreDetails(store)
            .call({ from: $blockchain.accounts[0] });
        currentStore = parseStore(str);
    };

    const addProduct = async () => {
        productDialogOpen = true;
        modalOpen = false;
    };

    let modalOpen = false;
    let buttoned = "Nothing yet.";
    let currentFloor = null;
    let activeTab;
    let currentStore = { price: null, rent: null };
    let productDialogOpen = false;
    let change = {
        price: false,
        rent: false,
        saleable: false,
        rentable: false,
    };
</script>

<Navbar bind:activeTab title="Mall Map" />
{#if $blockchain?.accounts?.[0]}
    <div class="map">
        <h1 class="heading">Map of MetaMall</h1>
        <div class="key">
            <h3 style="margin:0.5rem">Key :</h3>
            <div class="keyCard" style="background-color:{statusClr[4]}">
                Your Stores
            </div>
            <div class="keyCard" style="background-color:{statusClr[0]}">
                Saleable
            </div>
            <div class="keyCard" style="background-color:{statusClr[1]}">
                Rentable
            </div>
            <div class="keyCard" style="background-color:{statusClr[2]}">
                Both
            </div>
            <div class="keyCard" style="background-color:{statusClr[3]}">
                Not Available
            </div>
        </div>

        {#each floors as floor, i}
            <h1>Floor no. {i}</h1>
            {#each floor as store}
                <Button
                    on:click={() => {
                        currentFloor = i;
                        setStore(store);
                        modalOpen = true;
                    }}
                    style="background-color:{getColor(store)};"
                    touch
                    variant="raised"
                >
                    <Label>{store.storeNumber}</Label>
                </Button>
            {:else}
                No store on this floor
            {/each}
        {/each}

        <Dialog
            open={modalOpen}
            on:SMUIDialog:closed={(e) => {
                buttoned = e.detail.action;
                modalOpen = false;
            }}
            fullscreen
            aria-labelledby="fullscreen-title"
            aria-describedby="fullscreen-content"
        >
            <Header>
                <Title id="fullscreen-title">Store Details</Title>
                <IconButton action="close" class="material-icons"
                    >close</IconButton
                >
            </Header>
            <Content id="fullscreen-content">
                <div class="details">
                    <img
                        class="store-img"
                        src="src\assets\store.png"
                        alt="store"
                    />
                    <div class="row">
                        <h3 style="margin-right: 20px;">Store Number :</h3>
                        <div>{currentStore?.storeNumber}</div>
                    </div>
                    <div class="row">
                        <h3 style="margin-right: 20px;">Owner :</h3>
                        <div>{currentStore?.owner}</div>
                    </div>
                    {#if currentStore?.user}
                        <div class="row">
                            <h3 style="margin-right: 20px;">Tenant :</h3>
                            <div>{currentStore?.user}</div>
                        </div>
                    {/if}
                    <div class="row">
                        <h3 style="margin-right: 20px;">Price :</h3>
                        <div style="margin-right: 30px;">
                            <Textfield
                                class="shaped-outlined"
                                variant="outlined"
                                type="number"
                                bind:value={currentStore.price}
                                disabled={currentStore.owner !=
                                    $blockchain?.accounts?.[0]}
                                on:change={(e) => {
                                    change.price = true;
                                }}
                            >
                                <Icon
                                    class="material-icons"
                                    slot="leadingIcon"
                                    style="width:45px;"><GiMoneyStack /></Icon
                                >
                                <HelperText slot="helper"
                                    >Buying price of this land in ETH</HelperText
                                >
                            </Textfield>
                        </div>
                        <h3 style="margin-right: 20px;">Rent :</h3>
                        <div>
                            <Textfield
                                class="shaped-outlined"
                                variant="outlined"
                                type="number"
                                bind:value={currentStore.rent}
                                disabled={currentStore.owner !=
                                    $blockchain?.accounts?.[0]}
                                on:change={(e) => {
                                    change.rent = true;
                                }}
                            >
                                <Icon
                                    class="material-icons"
                                    slot="leadingIcon"
                                    style="width:45px;"><GiMoneyStack /></Icon
                                >
                                <HelperText slot="helper"
                                    >Rent/mo of this land</HelperText
                                >
                            </Textfield>
                        </div>
                    </div>

                    <div class="row">
                        <FormField align="end" style="margin-right: 30px;">
                            <Switch
                                bind:checked={currentStore.isSaleable}
                                disabled={currentStore.owner !=
                                    $blockchain?.accounts?.[0]}
                                onchange={(e) => {
                                    change.saleable = true;
                                }}
                            />
                            <span slot="label"><h3>Saleable</h3></span>
                        </FormField>
                        <FormField align="end">
                            <Switch
                                bind:checked={currentStore.isRentable}
                                disabled={currentStore.owner !=
                                    $blockchain?.accounts?.[0]}
                                onchange={(e) => {
                                    change.rentable = true;
                                }}
                            />
                            <span slot="label"><h3>Rentable</h3></span>
                        </FormField>
                    </div>
                </div>
            </Content>
            <Actions>
                <Button>Cancel</Button>
                {#if currentStore?.owner == $blockchain.accounts[0]}
                    <Button on:click={addProduct}>Add Product</Button>
                    <Button on:click={saveDetails}>Save</Button>
                {:else}
                    {#if currentStore?.isSaleable}
                        <Button on:click={buyLand}>Buy Land</Button>
                    {/if}
                    {#if currentStore?.isRentable}
                        <Button on:click={rentLand}>Rent Land</Button>
                    {/if}
                {/if}
            </Actions>
        </Dialog>

        <UploadModal
            open={productDialogOpen}
            shopNumber={currentStore?.shopNumber}
        />
    </div>
{:else}
    <Error />
{/if}

<style>
    .store-img {
        width: 30%;
        height: 50%;
        align-self: center;
    }
    .details {
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
    }
    * :global(.accordion-container) {
        padding: 24px;
        background-color: var(--mdc-theme-background, #f8f8f8);
    }
    * :global(.smui-accordion) {
        margin: 0 12px 24px;
    }
    * :global(.smui-accordion:last-child) {
        margin-bottom: 0;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 5px;
    }
    .map {
        background-image: url("src\\assets\\map.svg");
        padding: 15px;
    }
    .key {
        display: flex;
        font-family: auto;
        margin: 0.5rem;
    }
    .keyCard {
        margin: 0.25rem;
        padding: 0.5rem;
        border-radius: 15%;
        color: white;
    }
    .heading {
        font-size: 50px;
        font-family: auto;
        margin: 1rem;
    }
</style>
