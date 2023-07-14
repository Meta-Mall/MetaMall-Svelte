<script>
    import Navbar from "../components/UI/Navbar.svelte";
    import Button, { Label } from "@smui/button";
	import UnityPlayer from "../components/unity/UnityPlayer.svelte";
	import { store } from '../stores/store.js'


    let activeTab;
    const scroll = (viewId) => {
        const v = document.getElementById(viewId);
        v.scrollIntoView();
    };

    const unityConfig = {
		loaderUrl: 'MetaMallCore/MetaMallCore.loader.js',
		dataUrl: 'MetaMallCore/MetaMallCore.data',
		frameworkUrl: 'MetaMallCore/MetaMallCore.framework.js',
		codeUrl: 'MetaMallCore/MetaMallCore.wasm',
        companyName: 'MetaMall',
        productName: 'WebApp',
        productVersion: '0.1a',
	};


</script>

<Navbar bind:activeTab title="MetaMall-Shopping Mall in Metaverse" />
<div class="home" id="Home">
    <div class="welcome">
        <div class="subheading">Welcome to</div>
        <div class="heading">META MALL</div>
        <div class="subheading">A Shopping Mall in Metaverse</div>
        <Button on:click={() => scroll("Metaverse")} class="btn">Step Into Metaverse</Button>
    </div>
    <div>
        <img class="welcome-img" src="src\assets\welcome.png" alt="welcome" />
    </div>
</div>
<div class="about" id="About">
    <img class="about-img" src="src\assets\about us.png" alt="about" />
    <div>
        <h1 class="about-heading">About Us</h1>
        <p class="about-content">
            MetaMall is a shopping mall available to you at the comfort of your
            couch where you can do shopping, have fun, interact with others. If
            you are a shopping hobbiest or enjoys shopping alot, you are at the
            perfect place! In MetaMall, you can visit brand stores, place your
            orders, have fun, interact with others just like a real shopping
            mall. If you are a brand owner and want to have an impactful online
            presence, we provide you with the platform where you can have your
            shop, or rent it for advertisement only.
        </p>
    </div>
</div>
<div class="features" id="Features">
    <h1 class="features-heading">Features</h1>
    <div class="features-list">
        <div class="card">
            <h1>3D Online Shopping</h1>
            <p>
                Instead of doing boring online shopping on old fashioned
                websites, Enter in the metaverse where everything including
                shops, products etc will be in 3D.
            </p>
        </div>
        <div class="card">
            <h1>Buy Virtual Land</h1>
            <p>
                You can buy land in this 3D shopping mall and setup your own
                store where you can display your products in the form of 3D
                models.
            </p>
        </div>
        <div class="card">
            <h1>Rent Your Virtual Land</h1>
            <p>
                You can also rent your land to anyone and get rent each month. Due to the blockchain 
                technology of smart contracts used in this metaverse, you do not need to worry about getting your payment. 
            </p>
        </div>
        <div class="card">
            <h1>Change Your Avatar</h1>
            <p>
                Always worried about what to wear when going to shopping?
                We provide with numerous options to design how you will be looking in 3D world. After all, Looks matter!!
            </p>
        </div>
    </div>
</div>
<div id="Metaverse">
    <h1 class="features-heading">META MALL</h1>
<UnityPlayer bind:this={$store.unityInstance} config={unityConfig} playerCSS="metamall-player" />

</div>

<style>
    :global(.metamall-player) {
        width: 100%;
        margin: 0 auto;
    }

    .features-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .card {
        font-family: "Roboto", sans-serif;
        margin: 25px 25px;
        padding: 30px;
        border-radius: 50px;
        box-shadow: 0px 0px 10px 1px rgba(13, 6, 19, 0.25), 0px 0px 10px 0px rgba(34, 12, 49, 0.22);
        cursor: pointer;
        transition: all 0.25s;
        background-color: #9209c0;
        color: white;
        max-width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .home {
        background-color: #7b0b97;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .welcome {
        display: flex;
        flex-direction: column;
        color: white;
        width: 50%;
        padding: 5rem 0rem 4rem 5rem;
    }

    .welcome-img {
        width: 70%;
        margin: 5rem 0 5rem 1rem;
    }

    .heading {
        font-size: 100px;
        font-family: "Russo One", sans-serif;
        margin-top: -30px;
        margin-bottom: -30px;
    }
    .subheading {
        font-family: "Roboto", sans-serif;
        font-size: 30px;
    }

    .about {
        display: flex;
        flex-direction: row;
    }
    .about-img {
        width: 40%;
    }

    .about-heading {
        font-family: "Russo One", sans-serif;
        font-size: 50px;
        margin-top: 70px;
        margin-bottom: 20px;
        text-align: center;
    }

    .about-content {
        font-family: "Roboto", sans-serif;
        font-size: 20px;
        padding: 10px 50px;
        text-align: justify;
    }

    .features {
        background-image: url("src\\assets\\features.png");
        max-width: 100%;
    }

    .features-heading {
        font-family: "Russo One", sans-serif;
        font-size: 50px;
        margin-top: 70px;
        margin-bottom: 20px;
        text-align: center;
        color: #1d1c1c;
    }

    :global(.btn) {
        border-radius: 21px;
        font-family: "Roboto", sans-serif;
        color: #000000;
        font-size: 20px;
        background: #ff5df9;
        padding: 15px 25px 15px 25px;
        text-align: left;
        width: 50%;
        height: 12%;
        margin-top: 10px;
    }

    :global(.btn:hover) {
        background: #f5c1f4;
    }
</style>
