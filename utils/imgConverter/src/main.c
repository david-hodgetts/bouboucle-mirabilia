#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** args){
    if(argc != 2){
        puts("expects one argument, namely filepath of image to convert");
        return 1;
    }

    const char* filepath = args[1];

    printf("image filepath %s\n", filepath);
    
    int x,y,n;
    unsigned char *data = stbi_load(filepath, &x, &y, &n, 0);
    if(data == NULL){
        printf("failed to load image at filepath %s\n", filepath);
        return 1;
    }

    unsigned char* outBuffer = malloc(x * y * 4);
    if(outBuffer == NULL){
        puts("failed to allocate buffer, operation failed");
        return 1;
    }
    
    printf("%d %d %d\n", x, y, n);

    // copy red channel from source to new buffer
    for(int i = 0; i < (x * y); i++){
        size_t index = i * n;
        unsigned char red = data[index];

        size_t outIndex = i * 4;
        outBuffer[outIndex] = 0;
        outBuffer[outIndex + 1] = 0;
        outBuffer[outIndex + 2] = 0;
        outBuffer[outIndex + 3] = 255 - red; // invert alpha
    } 

    // hackety hack an output filepath
    char outputFilepath[1024];
    memcpy(outputFilepath, filepath, strlen(filepath));
    const char* extension = ".png";
    memcpy(outputFilepath + strlen(filepath), extension, strlen(extension));
    outputFilepath[strlen(filepath) + strlen(extension)] = 0;

    printf("output filename %s", outputFilepath);


    int writeCount = stbi_write_png(outputFilepath, x, y, 4, outBuffer, 0);
    if(writeCount == 0){
        printf("write of png file to filepath %s failed\n", outputFilepath);
        return 1;
    }

    free(outBuffer);
    puts("all done");
    return 0;
}