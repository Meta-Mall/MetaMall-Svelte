<script>
    import UploadModal from "../../components/UI/UploadModal.svelte";
    export const vendorAddress = "0x00000";
    export let ownedShops = [];
</script>

<h1>
    Your Address : {vendorAddress}
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

<style>
    .heading {
        margin:0.3rem;
        font-style: auto;
        font-size: 20px;
    }
</style>
