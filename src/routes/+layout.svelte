<script>
    import { onMount } from "svelte";
    import { AppContent } from "@smui/drawer";
    import Snackbar, { Label, Actions } from "@smui/snackbar";
    import IconButton from "@smui/icon-button";

    import axios from "axios";
    import firebaseConfig from "../firebaseConfig.js";
    import { store } from "../stores/store.js";
    import { initializeApp } from "firebase/app";
    import { loadContract, login } from "../blockchain";
    import { PUBLIC_SERVER_URL } from "$env/static/public";

    axios.defaults.baseURL = PUBLIC_SERVER_URL;

    onMount(async () => {
        $store.firebase = initializeApp(firebaseConfig);
        loadContract();

        const blockchainReload = async () => {
            await loadContract();
            login();
        };

        window.ethereum?.on("chainChanged", blockchainReload);
        window.ethereum?.on("accountsChanged", blockchainReload);
    });

    const handleGlobalKeyDown = (e) => {
        if (e.key == "Escape") {
            MinimizeMetaverse();
        }
    };

    const MinimizeMetaverse = () => {
        $store.unityInstance?.blurUnity();
    };

    const handleMetaverseCursorLock = async () => {
        console.log('on cursor lock change');
        const cursorLockState = await $store.unityInstance?.callFunctionWithReturn('UI', 'GetCursorInfo')
        if (!document.pointerLockElement && cursorLockState !== 'Confined') {
            console.log('minimizing');
            MinimizeMetaverse();
        }
        else if (document.pointerLockElement && $store.unityHidden) {
            document.exitPointerLock();
        }
    };
</script>

<svelte:window
    on:keydown={handleGlobalKeyDown}
/>

<svelte:document on:pointerlockchange={handleMetaverseCursorLock} />

<div>
    <AppContent class="app-content">
        <main class="main-content">
            <slot />
        </main>

        <Snackbar surface$class={$store.snackbar.type} bind:this={$store.snackbar.instance}>
            <Label>{$store.snackbar.text}</Label>
            <Actions>
                <IconButton class="material-icons" title="Dismiss">close</IconButton>
            </Actions>
        </Snackbar>
    </AppContent>
</div>

<style>
    html {
        scroll-behavior: smooth;
    }
</style>