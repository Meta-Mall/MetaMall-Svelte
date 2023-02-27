<script>
	import { onMount } from "svelte";

    export let config = {}
    export let playerCSS = "";

    let playerCanvas;
    let loading = 0;
    let playerInstance = null;


    

    onMount(() => {
        console.log("onMount");
        const loadUnityPlayer = async () => {
            try {
                playerInstance = await createUnityInstance(playerCanvas, config, (progress) => loading = progress * 100);
            }
            catch (e) {
                console.log(e);
            }
        }
        
        loadUnityPlayer();
    })

</script>

{#if config.loaderUrl}
    <script src={config.loaderUrl}/>
{/if}

<div>
    Unity Player
    <canvas id="unity-canvas" bind:this={playerCanvas} class={playerCSS}>

    </canvas>
    {#if loading != 100}
        <div class="loading">
            Loading {loading}
        </div>
    {/if}
</div>

<style>

</style>