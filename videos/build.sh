# set -xe

declare -a arr=("arc-en-ciel" "chenille-clignotante" "etoile" "explosion" "rythmes" "vagues-reculent" "vitesses")
# refs -> https://trac.ffmpeg.org/wiki/Concatenate

for filename in "${arr[@]}"
do
    source="${filename}.mkv"
    cropped="${filename}.cropped.ts";
    # original res = 725 x 532
    # cropped res = 725 x 462
    ffmpeg -y -i "$source" -filter:v crop=752:462:0:70 "$cropped"
    
    # generate titles
    titlefilename="${filename}.title.ts"
    ffmpeg -y -f lavfi -i color=size=752x462:duration=5:rate=30:color=black -vf "drawtext=fontfile=arial.ttf:fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:text=$filename" "${titlefilename}"

    finalname="${filename}.webm"

    ffmpeg -y -i "concat:$titlefilename|$cropped" -c copy "${filename}.concat.mp4"
done
