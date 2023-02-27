<script>
	import UnityPlayer from "../unity/UnityPlayer.svelte";

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

<UnityPlayer config={unityConfig} playerCSS="metamall-player" />

<style>
    :global(.metamall-player) {
        width: 95%;
        margin: 0 auto;
    }
</style>
