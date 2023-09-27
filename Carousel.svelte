<!--
https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t
-->
<script>
 const slideVideos = [
     { title: 'Les choix possibles de fréquence / durée de vie',
       src: 'rythmes.webm' },
     { title: 'Dessiner plus vite allonge les traits',
       src: 'vitesses.webm' },
     { title: 'Mettre en pause pour dessiner des traits qui clignotent',
       src: 'explosion.webm' },
     { title: "Ceci est dessiné d'un seul long trait",
       src: 'etoile.webm' },
     { title: 'Ceci est dessiné avec beaucoup de traits courts',
       src: 'vagues-reculent.webm' },
     { title: 'Varier les couleurs',
       src: 'arc-en-ciel.webm' },
     { title: 'Varier la vitesse de dessin',
       src: 'chenille-clignotante.webm' }];
 let slidesContainer;
 let slides = [];
 let slideIndex = 0;
 function nextClick() {
     console.log('next',slideIndex)
     const slide = slides[slideIndex];
     const slideWidth = slide.clientWidth;
     slideIndex = (slideIndex + 1) % slides.length
     slidesContainer.scrollLeft = slideIndex * slideWidth;
 }
 function prevClick() {
     console.log('previous',slideIndex)
     const slide = slides[slideIndex];
     const slideWidth = slide.clientWidth;
     const firstIndex = slideIndex == 0
     slideIndex = (firstIndex ? slides.length : slideIndex) - 1;
     slidesContainer.scrollLeft = slideIndex * slideWidth;
 }
 // TODO set listener on each video that triggers nextClick
 // onMount https://learn.svelte.dev/tutorial/onmount
 // event ended https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event
 // TODO next/prevClick stops current video and restarts next one
 // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 // TODO improve css: margins around video, video next to text (responsive)
</script>

<div class="slider-wrapper">
  <button class="slide-arrow" id="slide-arrow-prev" on:click={prevClick}>
    &#8249;
  </button>
  <button class="slide-arrow" id="slide-arrow-next" on:click={nextClick}>
    &#8250;
  </button>
  <div class="slides-container" bind:this={slidesContainer}>
    {#each slideVideos as slideVideo, i}
        <div class="slide" bind:this={slides[i]}>
            <p class="text">{slideVideo.title}</p>
            <video controls >
                <source src={`/videos/${slideVideo.src}`} type="video/webm" />
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
     /* height: calc(100vh - 2rem); */
     width: 100%;
     display: flex;
     overflow: scroll;
     scroll-behavior: smooth;
     list-style: none;
     margin: 15px;
     padding: 0;
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
     opacity: 0.75;
     background-color: #bfbfbf;
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

 .slide > video {
     width: 100%;
 }
 .text{
     font-size: var(--font-size);
 }
</style>
