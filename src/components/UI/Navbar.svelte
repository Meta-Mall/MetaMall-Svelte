<script>
    export let title;
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import List, {Item,Text,Graphic,Separator,Subheader,} from "@smui/list";
    import Drawer, {AppContent,Content,Header,Title as DrawerTitle,Subtitle,Scrim,} from "@smui/drawer";
    import IconButton from "@smui/icon-button";
    import Button, { Label } from "@smui/button";
    import MenuSurface from "@smui/menu-surface";
    import { firebaseGoogleLogin, showSnackbar } from "../../utils";
    import { store } from "../../stores/store";
    import { blockchain, login as loginWithWallet } from "../../blockchain";
    import axios from "axios";

    let menuOpen = false;
    let accountPopup = false;
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
                JSON.stringify({
                    userJSON: JSON.stringify(user),
                    type: "customer",
                })
            );
            surface.setOpen(false);
            showSnackbar("User Logged In successfully with Google account", "error");
            axios.get($store.user.photoURL);

        } catch (e) {
            showSnackbar(e.toString(), "error");
        }
    };

    const loginWithEthereum = async () =>{
        try {
            login();
            surface.setOpen(false);
            showSnackbar("Logged In With Ethereum Wallet Successfully", "success");
        } catch (error) {
            
        }
    }

    export let activeTab = "MetaMall";
    export const toggleMenu = () => (menuOpen = !menuOpen);

    const scroll = (viewId) => {
        const v = document.getElementById(viewId);
        v.scrollIntoView();
    };

    let surface;
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
<div class="topbar" variant="static">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={toggleMenu}>
                menu
            </IconButton>
            <Title>{title}</Title>
        </Section>
        <Section align="end" toolbar>
            {#if window.location.pathname == "/"}
                <Button style="border-radius: 10px; color:white; margin:0px 10px" on:click={() => scroll("Home")}>Home</Button>
                <Button style="border-radius: 10px; color:white; margin:0px 10px" on:click={() => scroll("About")}>About</Button>
                <Button style="border-radius: 10px; color:white; margin:0px 10px" on:click={() => scroll("Features")}>Features</Button>
                <Button style="border-radius: 10px; color:white; margin:0px 10px" on:click={() => scroll("Metaverse")}>Metaverse</Button>
            {/if}
            <Button
                bind:this={accountBtn}
                style="border-radius: 10px; background: #ff5df9; margin:0px 15px"
                on:click={() => surface.setOpen(true)}
                >Login
            </Button>
            <div>
                <MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT" style="top: 20px;
                width: max-content;
                height: max-content;">
                    <div
                        style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;"
                    >
                        <Button style="margin-top: 1em;" on:click={loginWithGoogle}>
                            Login with Google
                        </Button>
                        <Button style="margin-top: 1em;" on:click={loginWithEthereum}>
                            Login with Ethereum Wallet
                        </Button>
                    </div>
                </MenuSurface>
            </div>
            
        </Section>
    </Row>
</div>

<style>
    .topbar {
        color: white;
        background-color: #7b0b97;
        font-family: "Roboto", sans-serif;
    }

    .nav-title {
        font-size: xx-large;
        padding: 0.5rem;
    }

</style>
