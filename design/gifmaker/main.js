const sharp = require('sharp');

const frameOffset = 66; // this frame should have number 0;

async function processImage(imageBasename, imageIndex, sequenceLength){


    const imagepath = `${imageBasename}.${imageIndex.toString().padStart(3, '0')}`;
    
    let adjustedIndex = imageIndex - frameOffset;
    if(adjustedIndex < 0){
        adjustedIndex = sequenceLength + adjustedIndex;
    }
    console.log(`index ${imageIndex} adjustedIndex ${adjustedIndex}`);
    const outputImagepath = `./output/output.${adjustedIndex.toString().padStart(3, '0')}.png`;
    const image = sharp(imagepath);
    const meta = await image.metadata();

    const width = meta.width;
    const height = meta.height;
    // console.log("w x h", width, height);

    image
    .extract({
        top: 15,
        left: 27,
        width: 468,
        height: 107,
    })
    .extend({
            left: 770,
            right: 10,
            top: 0,
            bottom: 0,
            background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 255,
            }
        })
    .composite([{ input: './images/logo_mirabilia_familia_x_smaller.png', gravity: 'west'}])
    .toFile(outputImagepath, (err, info) => {
        if (err) {
            console.error(err);
        }
        // if (info) {
        //     console.log(info);
        // }
    });

}

async function main(){
    const imageBasename = "images/bouboucle-rapide.gif";
    const sequenceLength = 120;

    for(let i = 0; i < sequenceLength; i++){
        await processImage(imageBasename, i, sequenceLength);
    }
}

main();