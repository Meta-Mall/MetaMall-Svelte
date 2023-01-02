<script>
	import {
		Drawer,
		Button,
		CloseButton,
		Sidebar,
		SidebarBrand,
		SidebarCta,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	let hidden2 = true;
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<div class="navbar-container">
	<div class="title">
		<button class="no-border">
			<!-- menu svg -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
				on:click={() => (hidden2 = false)}
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
		<h3>MetaMall</h3>
	</div>
	<button>Play</button>
	<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
		<div class="flex items-center">
			<h5
				id="drawer-navigation-label-3"
				class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
			>
				Menu
			</h5>
			<CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
		</div>
		<Sidebar>
			<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
				<SidebarGroup>
					<SidebarItem label="Connect Wallet">
						<svelte:fragment slot="icon">
							<!-- Ethereum SVG -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l9-5-9-5-9 5 9 5z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l9-5-9-5-9 5 9 5z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 14l9-5-9-5-9 5 9 5z"
								/></svg
							>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Get Into Mall">
						<svelte:fragment slot="icon">
							<!-- Shop SVG -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 6l3 2m0 0l3-2m-3 2v12m0 0l-3 2m3-2l3-2m-3 2V6m6 14l3-2m0 0l3 2m-3-2v-12m0 0l-3-2m3 2l3 2m-3-2v12"
								/></svg
							>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Floor Plan" {spanClass}>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
								/></svg
							>
						</svelte:fragment>
						<svelte:fragment slot="subtext">
							<span
								class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
								>Pro</span
							>
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem label="Become a Vendor" {spanClass}>
						<svelte:fragment slot="icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
								/></svg
							>
						</svelte:fragment>
						<svelte:fragment slot="subtext">
							<span
								class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"
								>3</span
							>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>
</div>

<style>
	.navbar-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #f1f1f1;
		padding: 1% 4%;

		align-items: center;
	}

	.navbar-container .title h3 {
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		font-size: 20px;
	}

	.navbar-container button {
		background-color: #f1f1f1;
		cursor: pointer;
		border-radius: 50px;
		padding: 0.7% 1.8%;
		transition: all 0.2s ease-in-out;
		border: 2px solid #000000;
		font-weight: 600;
	}

	.navbar-container button:hover {
		background-color: #9000ff;
		color: #f1f1f1;
		border: 2px solid #9000ff;
	}

	.navbar-container h3:hover {
		color: #9000ff;
	}

	.navbar-container .title {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.navbar-container .no-border {
		border: 2px solid transparent;
	}
</style>
