<script>
    import { onMount } from "svelte";
	import { AppContent } from "@smui/drawer";
	import Navbar from "../components/UI/Navbar.svelte";
    import Snackbar, { Label, Actions } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';

    import { store } from "../stores/store";
    import { initializeApp } from "firebase/app";
    import firebaseConfig from '../firebaseConfig.js'

	let activeTab;
    onMount(async () => {
        $store.firebase = initializeApp(firebaseConfig);
    })
</script>

<div>
	<Navbar bind:activeTab />
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
