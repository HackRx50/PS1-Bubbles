import fitz  # PyMuPDF
import os

def extract_images_from_pdf(pdf_path, output_folder='extracted_images'):
    """
    Extracts all images from a PDF and saves them to the specified folder.
    
    Args:
        pdf_path (str): Path to the PDF file.
        output_folder (str): Folder to save the extracted images. Default is 'extracted_images'.
        
    Returns:
        List[str]: A list of filenames of the saved images.
    """
    # Ensure output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open the PDF file
    doc = fitz.open(pdf_path)
    count = 0
    saved_images = []  # List to store the names of saved images

    # Loop through each page in the PDF
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        
        # Get the list of images on the page
        image_list = page.get_images(full=True)
        
        # Loop through all images found
        for img_index, img in enumerate(image_list):
            # Extract the image XREF
            xref = img[0]
            
            # Extract the image bytes
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            # Get the image extension (e.g. jpg, png)
            image_ext = base_image["ext"]
            
            # Create the image filename and save it
            image_filename = os.path.join(output_folder, f"image{count}.{image_ext}")
            with open(image_filename, "wb") as image_file:
                image_file.write(image_bytes)
            
            print(f"Saved {image_filename}")
            saved_images.append(image_filename)  # Add the filename to the list
            count += 1

    doc.close()
    
    # Return the list of saved image filenames
    return saved_images

# Example usage
image_files = extract_images_from_pdf('sample.pdf')
print("Saved images:", image_files)
