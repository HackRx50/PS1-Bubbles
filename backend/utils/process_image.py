import cv2
import numpy as np
from PIL import Image, ImageEnhance

def sharpen_and_brighten(image_path, output_path, sharpness_factor=2, brightness_factor=1):
    """
    Sharpen and brighten an image, then save the result to a file.

    Parameters
    ----------
    image_path : str
        The path to the image to process.
    output_path : str
        The path to save the processed image to.
    sharpness_factor : int, optional
        The amount to sharpen the image by. Defaults to 4.
    brightness_factor : int, optional
        The amount to brighten the image by. Defaults to 1.
    """
    
    img = Image.open(image_path)
    
    sharpener = ImageEnhance.Sharpness(img)
    img_sharpened = sharpener.enhance(sharpness_factor)
    
    brightener = ImageEnhance.Brightness(img_sharpened)
    img_brightened = brightener.enhance(brightness_factor)
    
    img_brightened.save(output_path)
    
    print(f"Image processed and saved to {output_path}")



def preprocess_image(image,output_path="./demo_processed.jpg"):
    image = Image.open(image)
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    kernel = np.ones((1, 1), np.uint8)
    gray = cv2.dilate(gray, kernel, iterations=1)
    # return Image.fromarray(gray)
    Image.fromarray(gray).save(output_path)
    print(f"image processed and saved to {output_path}")

if __name__ == "__main__":
    sharpen_and_brighten(image_path="./sample/2.jpg", output_path="./demo_processed.jpg")

