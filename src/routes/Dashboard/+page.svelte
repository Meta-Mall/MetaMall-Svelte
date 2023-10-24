<script>
    import { blockchain } from "../../blockchain";
    import { onMount } from "svelte";
    import Navbar from "../../components/UI/Navbar.svelte";
    import LandCard from "../../components/UI/LandCard.svelte";
    import Error from "../../components/UI/Error.svelte";
    import web3 from "web3";

    let ownedShops = [];
    let rentedShops = [];

    onMount(async () => {
        //ownedShops = await $blockchain.contract.methods.getOwnedStores($blockchain?.accounts?.[0]).call({ from: $blockchain.accounts[0] });
        //rentedShops = await $blockchain.contract.methods.getRentedStores($blockchain?.accounts?.[0]).call({ from: $blockchain.accounts[0] });
    });

    async function getShops(account) {
        if ($blockchain.contract && account) {
            ownedShops = await $blockchain.contract.methods
                .getOwnedStores(account)
                .call({ from: $blockchain.accounts[0] });
                console.log("Shops got from blockchain", ownedShops)
        }
    }
    $: getShops($blockchain?.accounts?.[0]);

    function onSaleShopCount() {
        let count = 0;
        ownedShops.forEach((s) => {
            if (s.isSaleable) count++;
        });
        return count;
    }

    function onRentShopCount() {
        let count = 0;
        ownedShops.forEach((s) => {
            if (s.isRentable) count++;
        });
        return count;
    }
</script>

<Navbar title="Dashboard" />
{#if $blockchain?.accounts?.[0]}
    <img
        class="background-img"
        src="src\assets\Wave.svg"
        alt="dashboard header img"
    />
    <div class="header">
        <img
            class="hello-img"
            src="src\assets\man-saying-hello.png"
            alt="man saying hello"
        />
        <div>
            <p class="hello-text">Hi, i'm</p>
            <p class="address">{$blockchain?.accounts?.[0]}</p>
        </div>
    </div>
    
    <div class="land-cards">
        <LandCard heading="Owned Shops" content={ownedShops.length} />
        <LandCard heading="Rented Shops" content={rentedShops.length} />
        <LandCard heading="Your Shops on sale" content={onSaleShopCount()} />
        <LandCard heading="Your Shops on rent" content={onRentShopCount()} />
    </div>
    <!--
    <div>
        <UploadModal />
    </div>
    <div class="heading">total Shops:
        balance. address. avatar
        total products
        products viewed 
        shops listed for selling
        shops listed for renting
    </div>
    -->
{:else}
    <Error />
{/if}

<style>
    #balance {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 15px;
        left: -25px;
    }
    .wallet-img {
        width: 90px;
    }
    .land-cards {
        margin-top: 2%;
        display: flex;
        justify-content: center;
    }
    .header {
        z-index: 2;
        position: absolute;
        display: flex;
        top: 110px;
        left: 160px;
    }
    .hello-text {
        color: #c6a0d1;
        font-family: "Rouge Script";
        font-size: 55px;
        font-weight: normal;
        line-height: 48px;
        text-shadow: 1px 1px 2px #082b34;
    }
    .hello-img {
        width: 16rem;
        height: 16rem;
        top: -25px;
        left: 50px;
        position: relative;
    }
    .address {
        color: #ffffff;
        font-size: 30px;
        font-family: "Libre Baskerville", serif;
        line-height: 45px;
        padding-top: 5px;
    }
    .background-img {
        width: 100%;
        height: 14rem;
        transform: rotateX(180deg);
        z-index: 3;
    }
</style>
