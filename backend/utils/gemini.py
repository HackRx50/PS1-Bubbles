from config.config import GEMINI_KEY
import google.generativeai as genai


genai.configure(api_key=GEMINI_KEY)

def gemini_ocr(image_path,prompt):

    """
    Run the Gemini 1.5 Flash model on an image and prompt, returning the model's output as text.

    Args:
        image_path (str): The path to the image file to be processed.
        prompt (str): The prompt to be passed to the model.

    Returns:
        str: The output of the model.
    """
    myfile = genai.upload_file(image_path)

    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content(
    [myfile, "\n\n",prompt]
    )   
    # print(result)
    return result.text

def gemini_chat(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")   
    response = model.generate_content(prompt)
    return response.text