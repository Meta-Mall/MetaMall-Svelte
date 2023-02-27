<script>
    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import IconButton from "@smui/icon-button";
    import Drawer, {
        AppContent,
        Content,
        Header,
        Title as DrawerTitle,
        Subtitle,
        Scrim,
    } from "@smui/drawer";
    import Button, { Label } from "@smui/button";
    import List, {
        Item,
        Text,
        Graphic,
        Separator,
        Subheader,
    } from "@smui/list";

    let menuOpen = false;
    export let activeTab = "MetaMall";

    function setActive(value) {
        activeTab = value;
        menuOpen = false;
    }
    export const toggleMenu = () => (menuOpen = !menuOpen);



</script>

<div class="navbar">
    <TopAppBar variant="static" color="primary">
        <Row>
            <Section>
                <IconButton class="material-icons" on:click={toggleMenu}
                    >menu</IconButton
                >
                <Title>MetaMall - Shopping in Metaverse</Title>
            </Section>
            <Section align="end" toolbar>
                <IconButton class="material-icons" aria-label="Login">account_circle</IconButton>
            </Section>
        </Row>
    </TopAppBar>

    <Drawer variant="modal" fixed={false} bind:open={menuOpen}>
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
                    <Graphic class="material-icons" aria-hidden="true">local_mall</Graphic>
                    <Text>Mall</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Star")}
                    activated={activeTab === "Star"}
                >
                    <Graphic class="material-icons" aria-hidden="true">star</Graphic>
                    <Text>Star</Text>
                </Item>
                <Item
                    href="javascript:void(0)"
                    on:click={() => setActive("Sent Mail")}
                    activated={activeTab === "Sent Mail"}
                >
                    <Graphic class="material-icons" aria-hidden="true"
                        >send</Graphic
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

    
</div>

<style>
    
</style>
