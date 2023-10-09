# set -xe

declare -a arr=("arc-en-ciel" "chenille-clignotante" "etoile" "explosion" "rythmes" "vagues-reculent" "vitesses")
# refs -> https://trac.ffmpeg.org/wiki/Concatenate

for filename in "${arr[@]}"
do
    source="${filename}.mkv"
    # cropped="${filename}.cropped.mp4";
    final="${filename}.mp4"
    # original res = 725 x 532
    # cropped res = 725 x 462
    ffmpeg -y -i "$source" -filter:v crop=752:462:0:70 "$final"
    
    # generate titles
    # title="${filename}.title.mp4"
    # ffmpeg -y -f lavfi -i color=size=752x462:duration=5:rate=30:color=black -vf "drawtext=fontfile=arial.ttf:fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:text=$filename" "${title}"


    # concat title and cropped video
    # final="${filename}.webm"
    # ffmpeg -y -i $title -i $cropped -filter_complex "[0:v:0][1:v:0]concat=n=2:v=1:a=0[outv]" -map "[outv]" $final
    
    # move to destination
    mv $final ../public/videos/$final
done
