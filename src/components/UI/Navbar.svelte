<script>
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import List, {
        Item,
        Text,
        Graphic,
        Separator,
        Subheader,
    } from "@smui/list";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title as DrawerTitle,
        Subtitle,
        Scrim,
    } from "@smui/drawer";
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import MenuSurface from "@smui/menu-surface";
    import Textfield from "@smui/textfield";

    import { firebaseGoogleLogin, showSnackbar } from "../../utils";
    import { store } from "../../stores/store";
    import { blockchain, login as loginWithWallet } from "../../blockchain";

    let menuOpen = false;
    let accountPopup;
    let accountBtn;
    let snack;

    function setActive(value) {
        activeTab = value;
        menuOpen = false;
    }

    const loginWithGoogle = async () => {
        try {
            const result = await firebaseGoogleLogin($store.firebase);
            $store.user = result.user;
            const user = {
                userName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            };
            $store.unityInstance.callFunction(
                "Player",
                "UserLoggedIn",
                JSON.stringify({ user: JSON.stringify(user), type: "customer" })
            );
        } catch (e) {
            showSnackbar(e.toString(), "error");
        }
    };
    $: console.log($blockchain);

    export let activeTab = "MetaMall";
    export const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<Drawer variant="modal" bind:open={menuOpen}>
    <Header>
        <div class="nav-title">MetaMall</div>
        <Subtitle>Step into the shopping metaverse.</Subtitle>
    </Header>
    <Content>
        <List>
            <Separator />
            <Item
                href="/"
                on:click={() => setActive("Home")}
                activated={activeTab === "Home"}
            >
                <Graphic class="material-icons" aria-hidden="true"
                    >local_mall</Graphic
                >
                <Text>Home</Text>
            </Item>
            <Separator />
            <Item
                href="/Dashboard"
                on:click={() => setActive("Dashboard")}
                activated={activeTab === "Dashboard"}
            >
                <Graphic class="material-icons" aria-hidden="true"
                    >local_mall</Graphic
                >
                <Text>Dashboard</Text>
            </Item>
            <Separator />
            <Item
                href="/Map"
                on:click={() => setActive("Mall Map")}
                activated={activeTab === "Mall Map"}
            >
                <Graphic class="material-icons" aria-hidden="true">star</Graphic
                >
                <Text>Mall Map</Text>
            </Item>
            <Separator />
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("3D Models")}
                activated={activeTab === "3D Models"}
            >
                <Graphic class="material-icons" aria-hidden="true">star</Graphic
                >
                <Text>3D Models</Text>
            </Item>
            <Separator />
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Contact")}
                activated={activeTab === "Contact"}
            >
                <Graphic class="material-icons" aria-hidden="true">send</Graphic
                >
                <Text>Contact Us</Text>
            </Item>
            <Separator />
        </List>
    </Content>
</Drawer>
<!-- Don't include fixed={false} if this is a page wide drawer. It adds a style for absolute positioning. -->
<Scrim fixed={false} />
<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={toggleMenu}
                >menu</IconButton
            >
            <Title>MetaMall - Shopping Mall in Metaverse</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton
                bind:this={accountBtn}
                class="material-icons"
                aria-label="Account"
                on:click={() => accountPopup.setOpen(true)}
            >
                account_circle
            </IconButton>
        </Section>
    </Row>
    <MenuSurface
        anchorCorner="BOTTOM_RIGHT"
        anchorElement={accountBtn?.getElement()}
        bind:this={accountPopup}
    >
        <div
            style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
        >
            <Textfield
                value=""
                type="email"
                label="Login with gmail or with MetaMask"
                style="min-width: 250px;"
                input$autocomplete="email"
            />
            <Button style="margin-top: 1em;" on:click={loginWithGoogle}>
                Login
            </Button>
            <Button style="margin-top: 1em;" on:click={loginWithWallet}>
                Ethereum Login
            </Button>
        </div>
    </MenuSurface>
</TopAppBar>

<style>
    .nav-title {
        font-size: xx-large;
        font-family: auto;
        padding: 0.5rem;
    }
</style>
