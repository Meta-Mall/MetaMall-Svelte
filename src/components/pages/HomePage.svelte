<script>
	import UnityPlayer from "../unity/UnityPlayer.svelte";
	import { store } from '../../stores/store'

	const unityConfig = {
		loaderUrl: 'MetaMallCore/MetaMallCore.loader.js',
		dataUrl: 'MetaMallCore/MetaMallCore.data',
		frameworkUrl: 'MetaMallCore/MetaMallCore.framework.js',
		codeUrl: 'MetaMallCore/MetaMallCore.wasm',
        companyName: 'MetaMall',
        productName: 'WebApp',
        productVersion: '0.1a',
	};
</script>

<svelte:head>
	<title>MetaMall | Home</title>
	<meta name="description" content="Page description" />
</svelte:head>

Svelte builtin Global checking
<span>
	user obj in store: {$store.user ? JSON.stringify($store.user) : 'is null'}
</span>
<div>{JSON.stringify($store.user)}</div>
<button on:click={() => { $store.user = {name: "Asad"}}}>change whole obj</button>
<button on:click={() => { $store.user.name = $store.user.name === "Faiqah" ? "Asad" : "Faiqah"}}>change nested obj</button>
<!-- <UnityPlayer config={unityConfig} playerCSS="metamall-player" /> -->

<style>
    :global(.metamall-player) {
        width: 95%;
        margin: 0 auto;
    }
</style>
