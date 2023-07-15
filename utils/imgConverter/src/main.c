#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb_image_write.h"
#define STB_IMAGE_RESIZE_IMPLEMENTATION
#include "stb_image_resize.h"

#include <stdio.h>
#include <stdlib.h>

#define maxDimension 2048

unsigned char*
load_and_scale_image(const char* filepath, int* width, int* height, int* componentCount){
    int x,y,n;
    unsigned char *inputPixels = stbi_load(filepath, &x, &y, &n, 0);
    if(inputPixels == NULL){
        printf("failed to load image at filepath %s\n", filepath);
        exit(1);
    }
    printf("input image info: %d x %d (%d components)\n", x, y, n);

    if(x > y && x > maxDimension){
        float ratio = (float)y / (float)x;

        *width = maxDimension;
        *height = (float) maxDimension * ratio;
        *componentCount = n;

        printf("resizing to %d * %d\n", *width, *height);

        unsigned char* outputPixels = malloc(*width * *height * n);

        int result = stbir_resize_uint8(inputPixels, x, y, 0, outputPixels, *width, *height, 0, n);
        if(result == 0){
            puts("unable to resize image");
            exit(1);
        }
        
        free(inputPixels);

        return outputPixels;
    }

    if(y > x && y > maxDimension){
        float ratio = (float)x / (float)y;

        *height = maxDimension;
        *width = (float) maxDimension * ratio;
        *componentCount = n;

        printf("resizing to %d * %d\n", *width, *height);

        unsigned char* outputPixels = malloc(*width * *height * n);

        int result = stbir_resize_uint8(inputPixels, x, y, 0, outputPixels, *width, *height, 0, n);
        if(result == 0){
            puts("unable to resize image");
            exit(1);
        }

        free(inputPixels);

        return outputPixels;
    }

    puts("no resize necessary");
    // resize not necessary
    *height  = x;
    *width = y;
    *componentCount = n;
    return inputPixels;

}

int main(int argc, char** args){
    if(argc != 2){
        puts("expects one argument, namely filepath of image to convert");
        return 1;
    }

    const char* filepath = args[1];

    printf("image filepath %s\n", filepath);
    
    int x,y,n;
    unsigned char *inputPixels = load_and_scale_image(filepath, &x, &y, &n);
    printf("%d x %d (%d components)\n", x, y, n);


    unsigned char* outBuffer = malloc(x * y * 4);
    if(outBuffer == NULL){
        puts("failed to allocate buffer, operation failed");
        return 1;
    }
    

    // copy red channel from source to new buffer
    for(int i = 0; i < (x * y); i++){
        size_t index = i * n;
        unsigned char red = inputPixels[index];

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

    printf("output filename %s\n", outputFilepath);


    int writeCount = stbi_write_png(outputFilepath, x, y, 4, outBuffer, 0);
    if(writeCount == 0){
        printf("write of png file to filepath %s failed\n", outputFilepath);
        return 1;
    }

    free(inputPixels);
    free(outBuffer);
    puts("all done");
    return 0;
}