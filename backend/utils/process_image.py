
from PIL import Image, ImageEnhance

def sharpen_and_brighten(image_path, output_path, sharpness_factor=4, brightness_factor=1):
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