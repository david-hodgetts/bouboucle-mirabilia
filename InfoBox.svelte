<script>
  import Carousel from './Carousel.svelte';
</script>
<div class="backdrop">
    <div class="info-box">
        <h1>bouboucle mirabilia</h1>
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
</div>

<style>
    :root {
      --font-family: Arial, Helvetica, sans-serif;
      --font-size: 23px;
      --text-padding: 2px 0 0 20px;
    }
    .backdrop{
        /* height: 100vh; */
        background-color: white;
    }
    .info-box{
        margin: 0 auto;
        max-width: 600px;
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
</style>
