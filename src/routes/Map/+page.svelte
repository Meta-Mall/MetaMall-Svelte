<script>
    import Button, { Label } from "@smui/button";
    import { onMount } from "svelte";
    import { parseFloors } from "../../utils";
    import { blockchain } from "../../blockchain";

    let floors = [];
    const statusClr = ["#f72585", "#8a2ce2", "#121646", "#767778"];

    onMount(async () => {
        floors = await $blockchain.contract.methods.getAllStores().call({ from: $blockchain.accounts[0] });        
    });

    const getColor = (store) => {
        if(store.isSaleable && store.isRentable){
            return statusClr[2];
        }
        else if (store.isSaleable){
            return statusClr[0];
        }
        else if (store.isRentable){
            return statusClr[1];
        }
        else{
            return statusClr[3];
        }
    }

    const buyLand = async () => {
        await $blockchain.contract.methods.buy(currentStore[3]).call({ from: $blockchain.accounts[0] });
        open = false;
        currentStore = null;
    };

    const rentLand = async () => {
        await $blockchain.contract.methods
            .rentLand(currentStore[3])
            .call({ from: $blockchain.accounts[0] });
        open = false;
        currentStore = null;
    };

    import Dialog, { Title, Content, Actions } from "@smui/dialog";

    let open = false;
    let buttoned = "Nothing yet.";
    let currentStore = [];
</script>

<h1 class="heading">Map of MetaMall</h1>

<div class="key">
    <h3 style="margin:0.5rem">Key :</h3>
    <div class="keyCard" style="background-color:{statusClr[0]}">Saleable</div>
    <div class="keyCard" style="background-color:{statusClr[1]}">Rentable</div>
    <div class="keyCard" style="background-color:{statusClr[2]}">Both</div>
    <div class="keyCard" style="background-color:{statusClr[3]}">Not Available</div>

</div>      

{#each floors as floor, i}
    <h1>Floor no. {i}</h1>
    {#each floor as store}
            <Button
                on:click={() => {
                    open = true;
                    currentStore = store;
                }}
                style="background-color:{getColor(store)}"
                touch
                variant="raised"
            > 
                <Label>{store.storeNumber}</Label>
            </Button>
        {:else}
        No store of this floor
    {/each}
{/each}

<div>
    <Dialog
        bind:open
        bind:currentStore
        aria-labelledby="buttons-title"
        aria-describedby="buttons-content"
        autoStackButtons={false}
        on:SMUIDialog:closed={(e) => (buttoned = e.detail.action)}
    >
        <Title id="buttons-title">Store Details</Title>
        <Content id="buttons-content">
            Store Number : {currentStore.storeNumber}
            Owner : {currentStore.owner}
            Price : {currentStore.price}
            Rent : {currentStore.rent}
            Tenant : {currentStore.currentUser}
        </Content>
        <Actions>
            {#if currentStore.owner!=$blockchain.accounts[0] && currentStore.isSaleable == 1}
                <Button onclick={buyLand}>
                    <Label>Buy Land</Label>
                </Button>
            {/if}
            {#if currentStore.owner!=$blockchain.accounts[0] && currentStore.isRentable == 1}
                <Button onclick={rentLand}>
                    <Label>Rent Land</Label>
                </Button>
            {/if}
            <Button onclick={() =>{open = false; currentStore = null}}>
                <Label>Cancel</Label>
            </Button>
        </Actions>
    </Dialog>
</div>

<style>
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
