const sharp = require('sharp');

async function processImage(imageBasename, imageIndex){

    const imagepath = `${imageBasename}.${imageIndex.toString().padStart(3, '0')}`;
    const outputImagepath = `./output/output.${imageIndex.toString().padStart(3, '0')}.png`;
    const image = sharp(imagepath);
    const meta = await image.metadata();

    const width = meta.width;
    const height = meta.height;
    console.log("w x h", width, height);

    image
    .extract({
        top: 15,
        left: 27,
        width: 468,
        height: 107,
    })
    .extend({
            left: 460,
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
    .composite([{ input: './images/logo_mirabilia_x_smaller.png', gravity: 'west'}])
    .toFile(outputImagepath, (err, info) => {
        if (err) {
            console.error(err);
        }
        if (info) {
            console.log(info);
        }
    });

}

async function main(){
    const imageBasename = "images/bouboucle-rapide.gif";
    const sequenceLength = 120;

    for(let i = 0; i < sequenceLength; i++){
        await processImage(imageBasename, i);
    }
}

main();