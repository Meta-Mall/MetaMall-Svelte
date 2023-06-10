<script>
    import MdStore from 'svelte-icons/md/MdStore.svelte'
    export let content;
    export let heading;
    export let icon;
</script>

<div class="card">
    <div class="icon-style">
        {icon}
    </div>
    <div class="content">{content}</div>
    <div class="heading">{heading}</div>
</div>

<style>

    .icon-style{
        width: 40px;
    height: 40px;
    color: #310B42
    }

    .card {
        margin: 15px 15px;
        padding: 10px;
        width: 200px;
        height: 200px;
        border-radius: 30px;
        box-shadow: 0px 0px 10px 1px rgba(13, 6, 19, 0.25),
            0px 0px 10px 0px rgba(34, 12, 49, 0.22);
        cursor: pointer;
        transition: all 0.25s;
    }
    .card .heading {
        font-size: medium;
        padding: 5%;
        color: black;
        text-align: center;
        bottom: 2%;
    }

    .card .content{
        font-size: 60px;
    text-align: center
    }

    .card:hover {
        scale: 1.03;
    }
</style>
