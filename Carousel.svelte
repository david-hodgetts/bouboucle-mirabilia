<!--
https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t
-->
<script>
  const slideVideos = [
    'rythmes.webm',
    'vitesses.webm',
    'explosion.webm',
    'etoile.webm',
    'vagues-reculent.webm',
    'arc-en-ciel.webm',
    'chenille-clignotante.webm'];
  let slidesContainer;
  let slide;
  // const slidesContainer = document.getElementById("slides-container");
  // const slide = document.querySelector(".slide");
  // const prevButton = document.getElementById("slide-arrow-prev");
  // const nextButton = document.getElementById("slide-arrow-next");
  function nextClick() {
    console.log('next')
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
  }
  function prevClick() {
    console.log('previous')
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
  }
  /*
    nextButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
    });

    prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
    });
    */
</script>

<div class="slider-wrapper">
  <button class="slide-arrow" id="slide-arrow-prev" on:click={prevClick}>
    &#8249;
  </button>
  <button class="slide-arrow" id="slide-arrow-next" on:click={nextClick}>
    &#8250;
  </button>
  <div class="slides-container" bind:this={slidesContainer}>
    <div class="slide" bind:this={slide}>
      <video controls>
        <source src={`/videos/${slideVideos[0]}`} type="video/webm" />
      </video>
    </div>
    {#each slideVideos.slice(1) as slideVideo }
        <div class="slide">
        <video controls>
            <source src={`/videos/${slideVideo}`} type="video/webm" />
        </video>
        </div>
    {/each}
    <div class="slide">
    </div>
    <div class="slide">
    </div>
  </div>
</div>

<style>
    * {
    box-sizing: border-box;
    }

    .slider-wrapper {
    margin: 1rem;
    position: relative;
    overflow: hidden;
    }

    .slides-container {
    height: calc(100vh - 2rem);
    width: 100%;
    display: flex;
    overflow: scroll;
    }

    .slide-arrow {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 4rem;
    background-color: white;
    border: none;
    width: 2rem;
    font-size: 3rem;
    padding: 0;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 100ms;
    }

    .slide-arrow:hover,
    .slide-arrow:focus {
    opacity: 1;
    }

    #slide-arrow-prev {
    left: 0;
    padding-left: 0.25rem;
    border-radius: 0 2rem 2rem 0;
    }

    #slide-arrow-next {
    right: 0;
    padding-left: 0.75rem;
    border-radius: 2rem 0 0 2rem;
    }

    .slide {
    width: 100%;
    height: 100%;
    flex: 1 0 100%;
    }
</style>
