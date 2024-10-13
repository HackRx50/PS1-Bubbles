import os
import pandas as pd
from config.config import UPLOAD_FOLDER
import json
import numpy as np
import fitz


file_path = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
# print(file_path)
def get_prompts(filename):
    """
    Reads a file in the prompts directory and returns the contents as a string

    Parameters
    ----------
    filename : str
        name of the file to read

    Returns
    -------
    str
        contents of the file
    """
    with open("prompts/" + filename , 'r') as f:
        return f.read()


def calculate_subcategory_amounts(csv_rows):
    """
    Calculates the total of each subcategory from a list of CSV rows by matching columns by name.

    Parameters
    ----------
    csv_rows : list of lists
        A list where the first row contains the column names, and the subsequent rows contain the data.

    Returns
    -------
    pandas.DataFrame or None
        A DataFrame with the subcategory amounts, or None if an error occurs.
    """
    try:
        # print(csv_rows)
        # Convert the list of CSV rows into a pandas DataFrame using the first row as the header
        df = pd.DataFrame(csv_rows[1:], columns=csv_rows[0])

        # Ensure the required columns are present
        required_columns = ['item_subcategory', 'item_price', 'sub_category_amount']
        for col in required_columns:
            if col not in df.columns:
                raise ValueError(f"Missing required column: {col}")

        # Convert 'item_price' to numeric (handling potential errors)
        df['item_price'] = pd.to_numeric(df['item_price'], errors='coerce')
        df['sub_category_amount'].replace('null', np.nan, inplace=True)

        # Convert 'sub_category_amount' to numeric, handling potential errors
        df['sub_category_amount'] = pd.to_numeric(df['sub_category_amount'], errors='coerce')

        # Handle missing values (e.g., NaN) by filling them with 0 for summation
        df['item_price'].fillna(0, inplace=True)
        df['sub_category_amount'].fillna(0, inplace=True)

        # Group by 'item_subcategory' and sum the 'item_price' for each subcategory
        result = df.groupby('item_subcategory').agg(
            total_item_price=('item_price', 'sum'),
            sub_category_amount=('sub_category_amount', 'first')  # Assuming sub_category_amount is the same, take the first occurrence
        ).reset_index()

        result['difference'] = result['total_item_price'] - result['sub_category_amount']

        # Create a match field, set to True if total_item_price equals sub_category_amount, else False
        # Also handle NaN values by treating them as non-matches
        result['match'] = np.where(
            result['total_item_price'].isna() | result['sub_category_amount'].isna(), 
            False, 
            result['total_item_price'] == result['sub_category_amount']
        )
        result_dict = result.to_dict(orient='records')

    # Return as a JSON response
        return json.dumps(result_dict)
        # return result

    except ValueError as e:
        print(f"Error: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


def convert_csv_rows_to_json(csv_rows):
    """Convert csv_rows into a list of dictionaries using the first row as headers."""
    headers = csv_rows[0]  # First row is the header
    print(csv_rows)
    data_rows = csv_rows[1:]  # Rest are data rows
    csv_dict_list = [dict(zip(headers, row)) for row in data_rows]
    return csv_dict_list
















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









if __name__ == "__main__":
    calculate_subcategory_amounts()