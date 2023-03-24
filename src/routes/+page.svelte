<script>
    import HomePage from "../components/pages/HomePage.svelte";
    import UploadModal from "../components/UI/UploadModal.svelte";
    import { draw } from "svelte/transition";
    import IconButton from "@smui/icon-button";
    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,
    } from "@smui/card";

    let imgs = ["carousel-pic00.jpg", "carousel-pic2.jpg", "carousel-pic1.png"];

    let index = 0;
    const next = () => {
        index = (index + 1) % imgs.length;
    };
</script>

{#each [imgs[index]] as src (index)}
    <img class="carousel-img" {src} alt="carousel" />
{/each}
<div class="carousel-btn">
    <IconButton class="material-icons" on:click={next}
        >arrow_forward_ios</IconButton
    >
</div>

<div class="heading">About</div>
<div class="subheading">
    "MetaMall is a shopping mall available to you at the comfort of your couch
    where you can do shopping, have fun, interact with others. If you are a
    shopping hobbiest or enjoys shopping alot, you are at the perfect place! In
    MetaMall, you can visit brand stores, place your orders, have fun, interact
    with others just like a real shopping mall. If you are a brand owner and
    want to have an impactful online presence, we provide you with the platform
    where you can have your shop, or rent it for advertisement only"
</div>
<img class="about-img" src="woman-surfing.png" alt="" />
<div class="heading">Features</div>

<div class="card-container">
    <div class="card">
        You can buy virtual land where you will have the authority making this
        mall decentralized
    </div>

    <div class="card">
        You can rent virtual land if you have short term goals. You can rent a
        land for any number of months.
    </div>
    <div class="card">
        Customers can roam around different in different stores and can do shopping 
        while viewing 3D products
    </div>
</div>
<div class="heading">Metaverse</div>
<HomePage/>

<style>
    .card {
        border-radius: 10px;
        margin: 5px;
        padding: 8px;
        background-color: #e2d5e8;
        color: #310b42;
        min-width: 70%;
    }

    .carousel-img {
        width: 100%;
        height: 550px;
        object-fit: cover;
    }
    .about-img {
        width: 30%;
        position: relative;
        left: 35%;
    }
    .carousel-btn {
        position: relative;
        top: -300px;
    }
    .heading {
        display: flex;
        justify-content: center;
        font-size: 50px;
        font-family: auto;
    }
    .subheading {
        font-family: auto;
        font-size: 20px;
        width: 70%;
        margin: auto;
    }
    .card-container {
        border: 2pt;
        width: 40%;
        font-size: 15px;
        font-family: auto;
        display: flex;
        flex-direction: row;
        margin: 2rem;
    }
</style>
