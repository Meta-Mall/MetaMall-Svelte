<script>
	import { images } from '../../assets';
	import { CarouselTransition } from 'flowbite-svelte';
	import UnityPlayer from '../../unity/UnityPlayer.svelte';

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

<div class="">
	<h1>MetaMall - Step Into the Metaverse</h1>
	<CarouselTransition
		{images}
		transitionType="fly"
		transitionParams={{ delay: 250, duration: 300, x: 100 }}
		showCaptions={false}
		showThumbs={false}
	/>
</div>

<UnityPlayer config={unityConfig} playerCSS="metamall-player" />

<style>
	h1 {
		position: fixed;
		top: 37%;
		z-index: 200;
		font-weight: 600;
		color: white;
		padding-left: 5%;
		font-size: 36px;
	}

    :global(.metamall-player) {
        width: 95%;
        margin: 0 auto;
    }
</style>
