import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyCAzHIdUXBpC627ff2QdWyLDLqDMFCNdrY")

myfile = genai.upload_file('sample\\1.png')
print(f"{myfile=}")

model = genai.GenerativeModel("gemini-1.5-flash")
result = model.generate_content(
    [myfile, "\n\n", "return data in the image in a structured csv format way so that i can save it in a csv file"]
)
print(f"{result.text=}")

# from PIL import Image, ImageEnhance

# def sharpen_and_brighten(image_path, output_path, sharpness_factor=4, brightness_factor=1):
#     # Open the image
#     img = Image.open(image_path)
    
#     # Sharpen the image
#     sharpener = ImageEnhance.Sharpness(img)
#     img_sharpened = sharpener.enhance(sharpness_factor)
    
#     # Brighten the image
#     brightener = ImageEnhance.Brightness(img_sharpened)
#     img_brightened = brightener.enhance(brightness_factor)
    
#     # Save the result
#     img_brightened.save(output_path)
    
#     print(f"Image processed and saved to {output_path}")

# # Example usage
# sharpen_and_brighten("sample\\1.png", "output_image.png")