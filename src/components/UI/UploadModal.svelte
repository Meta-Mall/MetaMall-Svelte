<script lang="ts">
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Button, { Label } from "@smui/button";
    import axios from "axios";
    import { apis } from "../../utils/apis";
    import FormData from "form-data";

    let open = false;
    let buttoned = "Nothing yet.";
    let files;

    let product = {
        name: " ",
        description: " ",
        price: 0,
        order_link: " ",
        store: 0,
        modelFile: files,
    };

    async function addProduct(e) {
        try {
            e.preventDefault();
            console.log(files);
            product["modelFile"] = files;

            let form = new FormData();
            form.append("name", product.name);
            form.append("description", product.description);
            form.append("price", product.price);
            form.append("store", product.store);
            form.append("order_link", product.order_link);
            form.append("model_file", files[0]);
            
            const res = await axios.postForm(apis["addProduct"], form)
            
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<div>
    <Dialog
        bind:open
        aria-labelledby="buttons-title"
        aria-describedby="buttons-content"
        autoStackButtons={false}
        on:SMUIDialog:closed={(e) => (buttoned = e.detail.action)}
    >
        <div class="dialog">
            <Title id="buttons-title">Add Model</Title>
            <Content id="buttons-content">
                Here you can upload 3d model of your product which you want to
                display in your shop.
            </Content>

            <form id="addproductdialog" on:submit={(e) => addProduct(e)}>
                <div>
                    <label for="name">Name : </label>
                    <input
                        class="inputfield"
                        id="name"
                        bind:value={product.name}
                    />
                </div>

                <div>
                    <label for="Description">Description</label>
                    <input
                        id="Description"
                        type="text"
                        class="inputfield"
                        bind:value={product.description}
                    />
                </div>

                <div>
                    <label for="Price">Price</label>
                    <input
                        id="Price"
                        class="inputfield"
                        bind:value={product.price}
                    />
                </div>

                <div>
                    <label for="Store">Store No. </label>
                    <input
                        id="Store"
                        class="inputfield"
                        bind:value={product.store}
                    />
                </div>

                <div>
                    <label for="order">Product Order Link </label>
                    <input
                        type="url"
                        id="order"
                        class="inputfield"
                        bind:value={product.order_link}
                    />
                </div>

                <input
                    accept="/.obj"
                    bind:files
                    id="productModel"
                    type="file"
                    class="inputfield"
                />

                <div>
                    <input
                        class="custombutton"
                        type="submit"
                        value="Add Product"
                    />
                    <input
                        class="custombutton cancelButton"
                        type="submit"
                        value="Cancel"
                    />
                </div>
            </form>
        </div>
    </Dialog>
</div>

<Button on:click={() => (open = true)}>
    <Label>Open Dialog</Label>
</Button>

<style>
    .dialog {
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }

    .inputfield {
        padding: 0.5rem;
        margin: 1rem;
        font-size: medium;
        font-family: unset;
    }

    .custombutton {
        backface-visibility: hidden;
        background-color: #b42f0e;
        border-radius: 6px;
        border-width: 0;
        box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
            rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        font-family: -apple-system, system-ui, "Segoe UI", Roboto,
            "Helvetica Neue", Ubuntu, sans-serif;
        font-size: 100%;
        height: 44px;
        line-height: 1.15;
        margin: 12px 0 0;
        outline: none;
        overflow: hidden;
        padding: 0 25px;
        position: relative;
        text-align: center;
        text-transform: none;
        transform: translateZ(0);
        transition: all 0.2s, box-shadow 0.08s ease-in;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 40%;
    }

    .cancelButton {
        backface-visibility: hidden;
        background-color: #ecdddd;
        border-radius: 6px;
        border-width: 0;
        box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
            rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
        box-sizing: border-box;
        color: #b42f0e;
        cursor: pointer;
        font-family: -apple-system, system-ui, "Segoe UI", Roboto,
            "Helvetica Neue", Ubuntu, sans-serif;
        font-size: 100%;
        height: 44px;
        line-height: 1.15;
        margin: 12px 0 0;
        outline: none;
        overflow: hidden;
        padding: 0 25px;
        position: relative;
        text-align: center;
        text-transform: none;
        transform: translateZ(0);
        transition: all 0.2s, box-shadow 0.08s ease-in;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: 40%;
    }

    .custombutton:disabled {
        cursor: default;
    }

    .custombutton:focus {
        box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
            rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
            rgba(50, 151, 211, 0.3) 0 0 0 4px;
    }
</style>
