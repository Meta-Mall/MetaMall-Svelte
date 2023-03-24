<script>
	import UnityPlayer from "../unity/UnityPlayer.svelte";
    import Button from "@smui/button";
	import { store } from '../../stores/store'
	import { blockchain } from "../../blockchain";
	import { parseFloors } from "../../utils";

	const unityConfig = {
		loaderUrl: 'MetaMallCore/MetaMallCore.loader.js',
		dataUrl: 'MetaMallCore/MetaMallCore.data',
		frameworkUrl: 'MetaMallCore/MetaMallCore.framework.js',
		codeUrl: 'MetaMallCore/MetaMallCore.wasm',
        companyName: 'MetaMall',
        productName: 'WebApp',
        productVersion: '0.1a',
	};

	const getFloors = async () => {
		
		let floors = await $blockchain.contract.methods.getAllStores().call({ from: $blockchain.accounts[0] });
		console.log("floors: ", parseFloors(floors));
	}

</script>

<svelte:head>
	<title>MetaMall | Home</title>
	<meta name="description" content="Page description" />
</svelte:head>

<span>
	user obj in store: {$store.user ? JSON.stringify($store.user) : 'is null'}
</span>

<div>
	Checking contract connection
	<Button on:click={getFloors}>Get All Floors</Button>
</div>
<button on:click={() => { $store.user = {name: "Asad"}}}>change whole obj</button>
<button on:click={() => { $store.user.name = $store.user.name === "Faiqah" ? "Asad" : "Faiqah"}}>change nested obj</button>
<!--<UnityPlayer bind:this={$store.unityInstance} config={unityConfig} playerCSS="metamall-player" />
-->
<style>
    :global(.metamall-player) {
        width: 95%;
        margin: 0 auto;
    }

	
</style>
