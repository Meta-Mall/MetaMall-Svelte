<script>
    import UploadModal from "../../components/UI/UploadModal.svelte";
    import { blockchain } from "../../blockchain";
    import { onMount } from "svelte";

    let vendorAddress = $blockchain?.accounts?.[0];
    let ownedShops = [];

    onMount(() => {
        //get stores of vendorAddress from contract
    })
</script>

{#if vendorAddress}
    <h1>
        Your Address :{vendorAddress}
    </h1>
    <div>
        <UploadModal />
    </div>

    <div class="heading">Shops Owned:</div>
    <div>
        {#each ownedShops as shop}
            <div>shop.shopNumber</div>
        {/each}
    </div>
    <div class="heading">Shops Rented:</div>
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
