<script>
    import UploadModal from "../../components/UI/UploadModal.svelte";
    import { blockchain } from "../../blockchain";
    import { onMount } from "svelte";

    let ownedShops = [];
    let rentedShops = [];

    onMount(async () => {
        //ownedShops = await $blockchain.contract.methods.getOwnedStores($blockchain?.accounts?.[0]).call({ from: $blockchain.accounts[0] });
        //rentedShops = await $blockchain.contract.methods.getRentedStores($blockchain?.accounts?.[0]).call({ from: $blockchain.accounts[0] });
        
    })

    async function getShops(account){
        if($blockchain.contract && account){
            ownedShops = await $blockchain.contract.methods.getOwnedStores(account).call({ from: $blockchain.accounts[0] });
        rentedShops = await $blockchain.contract.methods.getRentedStores(account).call({ from: $blockchain.accounts[0] });
        }
       
    }

    $: getShops($blockchain?.accounts?.[0])
    
</script>

{#if $blockchain?.accounts?.[0]}
    <h1>
        Your Address :{$blockchain?.accounts?.[0]}
    </h1>
    <div>
        <UploadModal />
    </div>

    <div class="heading">Shops Owned:</div>
    <div>
        {#each ownedShops as shop}
            <div>{shop.storeNumber}</div>
        {/each}
    </div>
    <div class="heading">Shops Rented:</div>
    <div>
        <div>
            {#each rentedShops as shop}
                <div>{shop.storeNumber}</div>
            {/each}
        </div>
    </div>
{:else}
    You do not have logged In using MetaMask
{/if}

<style>
    .heading {
        margin: 0.3rem;
        font-style: auto;
        font-size: 20px;
    }
</style>
