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

    export const addEvent = (eventName, e) => {
        window.unityEvents[eventName] = e;
    }

    export const clearEvent = (eventName) => {
        window.unityEvents[eventName] = null;
    }

    const unityJSEmitter = (eventName, ...args) => {
        window.unityEvents?.[eventName]?.(...args);
    }

    onMount(() => {

        const loadUnityPlayer = async () => {
            try {
                window.unityEvents = { };
                playerInstance = await createUnityInstance(playerCanvas, config, (progress) => loading = progress * 100);
                window.unityJSEmitter = unityJSEmitter;
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