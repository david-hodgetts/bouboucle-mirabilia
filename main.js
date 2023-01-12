import  { makeUI, setupDomForVariant, UIVariant } from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import miraMakeExportAndInfoUi from './mira-export-info-ui.js'; // ??
import paper from 'paper/dist/paper-core';

console.log("running config", config);

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
    });
}


function addTopPadding(paddingPx, titleHeight){
    document.querySelector('.menu').style.paddingTop = `${paddingPx}px`;

    const applyCssPatch = element => {
        element.style.top = `${paddingPx + titleHeight}px`;
    }

    let itemsClasses = [
        '#overlay',
        '#color-submenu',
        '#timing-submenu',
        '#stroke-submenu',
        '#info-submenu',
        '#export-submenu',
        '#dialog-submenu',
        '#canvas-parent',

    ];

    const elements = itemsClasses.map(n => document.querySelector(n));
    for(const element of elements){
        console.log("el", element);
        applyCssPatch(element);
    }
}

async function main(){

    const variant = config.variant || UIVariant.default;
    // 1 choose ui variant and setup dom accordingly
    setupDomForVariant(variant);
    // 2 setup looper
    const urlParams = urlUtils.getUrlParams(location.href);
    const newTiming = 'new-timing' in urlParams || config.newTiming;
    const ratio = urlParams.ratio || config.ratio;
    const backgroundColor =
      urlParams['background-color'] || config.backgroundColor || '#ffffff';
    const showGallery = !!urlParams.gallery;
    const titleHeight = 79.67; // ui button row height in px
    const mirabiliaHeaderHeight = 79; // height of external mirabilia header height
    const fullSizeGif = !!urlParams['big-gif'];
    const foregroundUrl = 'Coloriage_Assiette-polaire.png';
    const foregroundImage = await loadImage(foregroundUrl);
    console.log("img", foregroundImage)
    const targetHeight = window.innerHeight - titleHeight;
    const scale = targetHeight / foregroundImage.naturalHeight;
    const dimension = {
        "width": foregroundImage.naturalWidth * scale,
        "height": foregroundImage.naturalHeight * scale,
    };

    const graphics = {
        canvas: document.getElementById('main-canvas'),
        paper: paper,
    };

    const looperConfig = Object.assign({
        graphics: graphics,
        backgroundColor: backgroundColor,
        foregroundUrl,
    }, dimension);

    if (ratio) {
        looperConfig.ratio = eval(ratio);
    }


    const looper = makeLooper(looperConfig);
    looper.start();
    if (urlParams.gist) {
        io.gists.load(urlParams.gist, looper.importData);
    }

    makeUI(variant, looper, fullSizeGif, newTiming, dimension,
           showGallery, miraMakeExportAndInfoUi);

    window.addEventListener('resize', () => {
        looper.scale({
            width: window.innerWidth,
            height: window.innerHeight - (titleHeight + mirabiliaHeaderHeight),
            ratio
        });
    });

    addTopPadding(mirabiliaHeaderHeight, titleHeight);
    
    // TODO: improve
    // force scale to setup correct first frame display
    looper.scale({
        width: window.innerWidth,
        height: window.innerHeight - (titleHeight + mirabiliaHeaderHeight),
        ratio
    });
}

main();
