
from PIL import Image, ImageEnhance

def sharpen_and_brighten(image_path, output_path, sharpness_factor=4, brightness_factor=1):
    # Open the image
    img = Image.open(image_path)
    
    # Sharpen the image
    sharpener = ImageEnhance.Sharpness(img)
    img_sharpened = sharpener.enhance(sharpness_factor)
    
    # Brighten the image
    brightener = ImageEnhance.Brightness(img_sharpened)
    img_brightened = brightener.enhance(brightness_factor)
    
    # Save the result
    img_brightened.save(output_path)
    
    print(f"Image processed and saved to {output_path}")