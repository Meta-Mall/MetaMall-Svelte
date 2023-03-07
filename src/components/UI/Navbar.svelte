<script>
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";
    import Drawer, { AppContent, Content, Header, Title as DrawerTitle, Subtitle, Scrim, } from "@smui/drawer";
    import IconButton from '@smui/icon-button';
    import Button, { Label } from "@smui/button";
    import MenuSurface from '@smui/menu-surface';
    import Textfield from '@smui/textfield';
    import { firebaseGoogleLogin, showSnackbar } from "../../utils";
    import { store } from "../../stores/store";

    let menuOpen = false;
    let accountPopup;
    let accountBtn;
    let snack;

    function setActive(value) {
        activeTab = value;
        menuOpen = false;
    }

    const loginWithGoogle = async () => {
        showSnackbar('Lallu ki notification', 'success')
        try {
            const result = await firebaseGoogleLogin($store.firebase)
            $store.user = result.user
        }
        catch (e) {
            showSnackbar(e.message, 'error')
        }
    }

    export let activeTab = "MetaMall";
    export const toggleMenu = () => (menuOpen = !menuOpen);
</script>

<Drawer variant="modal" bind:open={menuOpen}>
    <Header>
        <DrawerTitle>MetaMall</DrawerTitle>
        <Subtitle>Step into the shopping metaverse.</Subtitle>
    </Header>
    <Content>
        <List>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("metamall")}
                activated={activeTab === "metamall"}
            >
                <Graphic class="material-icons" aria-hidden="true"
                    >local_mall</Graphic
                >
                <Text>Mall</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Star")}
                activated={activeTab === "Star"}
            >
                <Graphic class="material-icons" aria-hidden="true">star</Graphic
                >
                <Text>Star</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Sent Mail")}
                activated={activeTab === "Sent Mail"}
            >
                <Graphic class="material-icons" aria-hidden="true">send</Graphic
                >
                <Text>Sent Mail</Text>
            </Item>

            <Separator />
            <Subheader tag="h6">Labels</Subheader>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Family")}
                activated={activeTab === "Family"}
            >
                <Graphic class="material-icons" aria-hidden="true"
                    >bookmark</Graphic
                >
                <Text>Family</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive("Friends")}
                activated={activeTab === "Friends"}
            >
                <Graphic class="material-icons" aria-hidden="true"
                    >bookmark</Graphic
                >
                <Text>Friends</Text>
            </Item>
        </List>
    </Content>
</Drawer>
<!-- Don't include fixed={false} if this is a page wide drawer. It adds a style for absolute positioning. -->
<Scrim fixed={false} />
<TopAppBar variant="static" color="primary">
    <Row>
        <Section>
            <IconButton class="material-icons" on:click={toggleMenu}>menu</IconButton>
            <Title>MetaMall - Shopping in Metaverse</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton bind:this={accountBtn} class="material-icons" aria-label="Account" on:click={() => accountPopup.setOpen(true)}>
                account_circle
            </IconButton>
        </Section>
    </Row>
    <MenuSurface anchorCorner="BOTTOM_RIGHT" anchorElement={accountBtn?.getElement()} bind:this={accountPopup}>
        <div style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;">
            <Textfield value='' type="email" label="To" style="min-width: 250px;" input$autocomplete="email" />
            <Button style="margin-top: 1em;" on:click={loginWithGoogle}>
                Login
            </Button>
        </div>
      </MenuSurface>
</TopAppBar>
