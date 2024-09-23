import google.generativeai as genai

genai.configure(api_key="AIzaSyCAzHIdUXBpC627ff2QdWyLDLqDMFCNdrY")

def gemini_ocr(image_path,prompt):

    myfile = genai.upload_file(image_path)

    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content(
    [myfile, "\n\n",prompt]
    )   
    print(result)
    return result.text