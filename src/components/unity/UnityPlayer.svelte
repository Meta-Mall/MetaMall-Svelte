<script>
	import { onMount, createEventDispatcher } from "svelte";
    
    let loading = 0;
    let playerCanvas;
    let playerInstance = null;
    const dispatch = createEventDispatcher();

    
    export let config = {}
    export let playerCSS = "";
    export let id = "unity-player"
    export let isLoaded = false;
    export const returnValuePromises = { };
    export const canvasId = 'unity-canvas'

    export const callFunction = (gameObjName, functionName, arg) => {
        playerInstance?.SendMessage(gameObjName, functionName, arg);
    }

    export const callFunctionWithReturn = async (gameObjName, functionName, arg) => {
        playerInstance?.SendMessage(gameObjName, functionName, arg);
        return new Promise((resolve, reject) => {
            returnValuePromises[`${functionName}_Returned`] = { resolve, reject };
        })
    }

    export const addEvent = (eventName, e) => {
        window.unityEvents[eventName] = e;
    }

    export const clearEvent = (eventName) => {
        window.unityEvents[eventName] = null;
    }

    export const focusUnity = () => {
        dispatch('focus');
    }

    export const blurUnity = () => {
        dispatch('blur');
    }

    export const fullScreen = (value) => {
        console.log("asad")
        playerInstance.SetFullscreen(value ? 1 : 0);
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
                dispatch('load');
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

<div {id}>
    <canvas id={canvasId} bind:this={playerCanvas} class={playerCSS} />
    {#if loading != 100}
        <div class="loading">
            Loading {loading}
        </div>
    {/if}
</div>

<style>

</style>