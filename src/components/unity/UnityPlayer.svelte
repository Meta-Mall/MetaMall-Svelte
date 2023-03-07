<script>
	import { onMount } from "svelte";
    import { store } from "../../stores/store";
    
    let playerCanvas;
    let loading = 0;
    let playerInstance = null;

    export let config = {}
    export let playerCSS = "";

    export let isLoaded = false;
    export const callFunction = (gameObjName, functionName, arg) => {
        playerInstance?.SendMessage(gameObjName, functionName, arg);
    }

    onMount(() => {
        console.log("onMount");
        const loadUnityPlayer = async () => {
            try {
                playerInstance = await createUnityInstance(playerCanvas, config, (progress) => loading = progress * 100);
                isLoaded = true;
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