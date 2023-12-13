import { getAssetString, injectCSS } from '@andreaskundig/looper-ui';
import InfoBox from './InfoBox.svelte';

export default function makeExportAndInfoUi(menu, looper, io, fullSizeGif){

    const download_10 = getAssetString('10_download.svg');
    const erase_4 = getAssetString('4_erase.svg');
    const done_8 = getAssetString('8_done.svg');

    // var infoContent = [
    //     '<div class="info">',
    //     ' <div class="info-fr">',
    //     '   <p>Bouboucle est un projet ',
    //     "      d'Andréas Kündig et Ivan Gulizia.</p>",
    //     "   <p>Publie ton animation sur notre ",
    //     '     <a class="link" target="_blank"',
    //     '        href="http://blog.bouboucle.com">blog</a>.',
    //     "     Non vraiment, tu es le bienvenu.</p>",
    //     "   <p>Visite la ",
    //     '     <a class="link"',
    //     '        href="http://www.bouboucle.com/gallery.html">galerie</a>',
    //     "     d'animations créées spécialement pour notre exposition à ",
    //     '     <a class="link" target="_blank" href="http://www.bdfil.ch/edition-2018/les-expositions/bouboucle">BFIL.</a></p>',
    //     "   <p>L'<a",
    //     '     href="ancien.html"  target="_blank"',
    //     '     class="link">ancienne version</a>',
    //     '     plus compliquée est toujours disponible.</p>',
    //     ' </div>',
    //     ' <div class="info-fr">',
    //     "   <p>Ça fait plus que 10 ans qu'<a ",
    //     '      href="http://www.andreaskundig.ch" target="_blank"',
    //     '      class="link">Andréas</a>',
    //     '      a la flemme de mettre à jour son site.</p>',
    //     "   <p>Mais celui d'<a",
    //     '      href="http://www.ivangulizia.com/" target="_blank"',
    //     '      class="link">Ivan</a> est impeccable.</p>',
    //     ' </div>',
    //     '</div>'
    // ].join('\n'),
    //
    const infoExportCSS = `
    #info-submenu {
        height: auto;
        bottom: 0;
        overflow-y: scroll;
    }
    .infobox {
        position: relative;
        margin: 0 auto;
        max-width: 600px;
        color: black;
        font-family: var(--font-family);
        /*  remove calc when we're no longer using
            the other font-size declaration
            and we can add 2px to --font-size itself
        font-size: calc(2px + var(--font-size));
        font-weight: bold;
        */
        font-size: var(--font-size);
    }
    .infobox_centered {
        text-align: center;
    }
    .export-dialog__row {
        margin-top: 20px;
        line-height: normal;
    }
    .export-dialog__text {
        margin-top: 30px;
    }
    .export-dialog__button {
        display: inline-block;
        margin-left: 50px ;
        margin-right: 50px ;
    }
    .export-dialog__button:active{
        background-color: #bbbbbb;
    }
    .export-dialog__progbar{
        width: 500px;
        background-color: darkGrey;
        margin-right:  auto;
        margin-left:  auto;
    }
    .export-dialog__progbar > div{
        height: 10px;
        background-color: darkCyan;
    }
    .export-dialog__gif {
        border: 1px solid #dddddd;
    }
    .text__paragraph{
        line-height: 130%;
        margin: 6px;
    }
    .text__link {
        color: rgb(77, 208, 225);
        text-decoration: none;
    }
    .instructions{
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    .instructions__row{
        display: flex;
        line-height: normal;
    }
    .instructions__icon {
        width: 27px;
    }
    .instructions__text {
        padding: 2px 0 0 20px;
    }
        `;

    const exportContent = `
         <div class="export-1 infobox infobox_centered">
           <div class="no-gist export-dialog__row">
             <p>Veux-tu générer un gif?</p>
           </div>
           <div class="gist no-gist export-dialog__row">
            <div id="export-cancel-button" class="export-dialog__button">
                <img src="${erase_4}">
            </div>
            <div id="export-ok-button" class="export-dialog__button">
                 <img src="${done_8}"></div>
           </div>
         </div>
         <div class="export-2 infobox infobox_centered">
           <div class="no-gist export-dialog__row">
             <p>Un instant</p>
           </div>
          <div id="gif-progress-bar"
               class="gist no-gist export-dialog__row export-dialog__progbar"><div></div></div></div>
         <div class="export-3 infobox infobox_centered" >
           <div class="no-gist export-dialog__row ">
             <p class="export-dialog__text">Voilà</p>
           </div>
           <div class="gist no-gist export-dialog__row">
             <div><img id="gif" class="export-dialog__gif"></img></div>
             <div class="export-dialog__button">
               <a download="bouboucle.gif" id="gif-download">
                     <img src="${download_10}">
               </a>
             </div>
           </div>
         </div>
`;

        var showElements = function(parentSelector, showClass){
            document.querySelector(parentSelector)
                .childNodes
                .forEach(function(e){
                    if(! e.classList){ return; }
                    var hasClass = e.classList.contains(showClass);
                    e.classList[hasClass ? 'remove': 'add']('hidden');
                });
        },
        
        requestAnimationFramePromise = function(){
            return new Promise(function(resolve, reject){
                requestAnimationFrame(resolve);
            });
        },
        
        displayRecording = function(record, fullSizeGif){
            var progBar = document.querySelector('#gif-progress-bar'),
                progIndex = progBar.firstChild,
                progressCallback = function(prog){
                    var width = Math.abs(500*(0.1+prog*0.9));
                    progIndex.style.width = width +'px';
                };
            console.log('start recording');
            progIndex.style.width = Math.abs(500*0.1) +'px';
            return requestAnimationFramePromise().then(function(){
                return record({progress: progressCallback,
                               fullSize: fullSizeGif});
            }).then(
                function(imgSrc){
                    var download = document.querySelector('#gif-download'),
                        gif = document.querySelector('#gif'),
                        //         window - buttons - .info padding
                        maxHeight = window.innerHeight  - 79.67 - 40;
                    //    - text height - .info>div margin - icon height
                    maxHeight = maxHeight - 27.3 - 3 * 40 - 113;
                    download.href = imgSrc;
                    //available height: innerHeight - 113 
                    gif.src = imgSrc;
                    gif.style.maxHeight = maxHeight + 'px';
                    
                },
                function(o){
                    console.error(o.error,o);
                }
            );
        },

        initExportButton = function(looper, menu){
            var exportButtonDiv = document.querySelector('#export-button'),
                exportMenuSelector = '#export-submenu',
                exportMenuDiv = document.querySelector(exportMenuSelector);
            exportMenuDiv.innerHTML = exportContent;
            var exportCancelBtnDiv = document.querySelector(
                    '#export-cancel-button'),
                exportOkBtnDiv = document.querySelector('#export-ok-button'),
                beforeShow = function(){
                    // showElements('.export-1', 'no-gist');
                    showElements(exportMenuSelector, 'export-1');
                };
            exportCancelBtnDiv.addEventListener('click', function(){
                menu.hideSubmenu();
            });
            exportOkBtnDiv.addEventListener('click', function(){
                showElements(exportMenuSelector, 'export-2');
                displayRecording(looper.record, fullSizeGif)
                    .then(function(){
                        showElements(exportMenuSelector, 'export-3');
                    });
            });

            menu.initShowSubmenu(exportMenuDiv, exportButtonDiv, beforeShow);
        },
        
        initInfoButton = function(menu){
            var infoButtonDiv = document.querySelector('#info-button'),
                infoMenuDiv = document.querySelector('#info-submenu');
            // infoMenuDiv.innerHTML = infoContent;

            infoMenuDiv.style.height = 'auto';
            infoMenuDiv.style.bottom = 0;
            infoMenuDiv.style.overflowY = 'auto';

            const basePath = import.meta.env.BASE_URL == '/' ? "" : import.meta.env.BASE_URL;
            new InfoBox({
                target: infoMenuDiv,
                props: {
                    menu: menu,
                    basePath: basePath,
                }
            });
            // infoMenuDiv.addEventListener('click', function(){
            //     menu.hideSubmenu();
            // });
            menu.initShowSubmenu(infoMenuDiv, infoButtonDiv);

            return infoButtonDiv;
            
        },

        firstTimeOpened = function(){
            try{
                const result = localStorage.getItem("_bouboucle_first_open");
                return ! (!!result);
            }catch(e){
                return true;
            }
        },
        
        setSiteWasOpened = function(){
            try{
                localStorage.setItem("_bouboucle_first_open", "true");
            }catch(e){
            }
        },

        init = function(menu, looper, fullSizeGif){
            injectCSS(infoExportCSS);
            initExportButton(looper, menu, fullSizeGif);
            const infoButton = initInfoButton(menu);
            if(firstTimeOpened()){
                infoButton.click();
                setSiteWasOpened();
            }
        };
    init(menu, looper, fullSizeGif);
};
