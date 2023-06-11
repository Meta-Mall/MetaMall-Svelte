<script>
    import Button from "@smui/button";

</script>

<div class="notfound">
    <div class="notfound">
        <div class="notfound-404">
            <img src="src\\assets\\oops.PNG" alt="oops" />
        </div>
        <h2>401 - Unauthorized</h2>
        <p>
            The page you are looking for requires you to logged in using you
            MetaMask wallet.
        </p>
        <Button style="background-color:#7b0b97; color:white; padding:30px; border-radius:40px; margin:30px;" href="/">Go To Homepage</Button>
    </div>
</div>

<style>
    .notfound {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px;
        
    }

    @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2)
            format("woff2");
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF,
            U+A640-A69F, U+FE2E-FE2F;
    }
</style>
