<script>
    import Carousel from './Carousel.svelte';

    export let menu;

    function hide(e){
        console.log(e);
        menu.hideSubmenu();
    }
</script>
<div class="backdrop" on:click={hide} on:keypress={() => null}>
</div>
    <button class="close-button" on:click={hide}><img src="/images/close.svg" alt="close button"></button>
    <div class="info-box">
        <div class="instructions">
            <div class="row">
                <img src="/_icons/1_couleur+2_taille_5.svg" alt="" class="icon">
                <div class="text">Choisis ta couleur</div>
            </div>
            <div class="row">
                <img src="/_icons/2_taille_3.svg" alt="" class="icon">
                <div class="text">Fixe l'épaisseur de ton trait</div>
            </div>
            <div class="row">
                <img src="/_icons/3_trait_3.svg" alt="" class="icon">
                <div class="text">Définis la fréquence / durée de vie de la ligne</div>
            </div>
            <!-- <div class="row"> -->
            <!--     <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" class="icon"> -->
            <!--     <div class="text">Dessine!</div> -->
            <!-- </div> -->
            <div class="row">
                <img src="/_icons/8_done.svg" alt="" class="icon">
                <div class="text">Quand tu as terminé, télécharge ton animation</div>
            </div>
            <Carousel />
        </div>
    </div>
<!-- </div> -->

<style>
    :root {
      --font-family: Arial, Helvetica, sans-serif;
      --font-size: 23px;
      --text-padding: 2px 0 0 20px;
    }
    .backdrop{
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 0;
    }
    .info-box{
        position: relative;
        margin: 0 auto;
        max-width: 600px;
        height: 100%;
        color: black;
        font-family: var(--font-family);
    }
    .instructions{
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    .row{
        display: flex;
    }
    .text{
        font-size: var(--font-size);
        padding: var(--text-padding);
    }
    .icon{
        width: 27px;
    }
    .close-button{
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        border: none;
        background: none;
        width: 40px;
        height: 40px;
    }

    @media only screen and (min-width: 320px) and (max-width: 850px) {
       .close-button {
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
       }
     }
    .close-button img{
        width: 100%;
        height: 100%;
    }
</style>
