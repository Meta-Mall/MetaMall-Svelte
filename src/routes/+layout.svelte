<script>
	import Navbar from "../components/UI/Navbar.svelte";

	import Drawer, {
        AppContent,
        Content,
        Header,
        Title as DrawerTitle,
        Subtitle,
        Scrim,
    } from "@smui/drawer";

	import Button, { Label } from "@smui/button";

	let activeTab;

</script>

<div>
	<Navbar bind:activeTab />
	<!-- Don't include fixed={false} if this is a page wide drawer.
            It adds a style for absolute positioning. -->
    <Scrim fixed={false} />
    <AppContent class="app-content">
        <main class="main-content">
			<slot />
        </main>
    </AppContent>
</div>
