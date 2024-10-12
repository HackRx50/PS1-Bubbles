import os
import pandas as pd
from config.config import UPLOAD_FOLDER


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


def calculate_subcategory_amounts():
    """
    Reads a CSV file and calculates the total of each subcategory

    Parameters
    ----------
    file_path : str
        path to the CSV file

    Returns
    -------
    pandas.DataFrame
        a DataFrame with the subcategory amounts
    """
    try:
        # Read the CSV file into a pandas DataFrame
        f = os.getcwd() + "\\uploads\\extracted_text.csv"
        print(os.getcwd())
        df = pd.read_csv(f)
        
        # Group by 'item_subcategory' and sum the 'item_amount' for each subcategory
        result = df.groupby('item_subcategory').agg(
            total_item_amount=('item_amount', 'sum'),
            sub_category_amount=('sub_category_amount', 'first')  # Since sub_category_amount is the same, just take the first occurrence
        ).reset_index()
        
        return result
    except FileNotFoundError:
        print(f"Error: The file {f} does not exist.")
        return None
    except pd.errors.EmptyDataError:
        print(f"Error: The file {f} is empty.")
        return None
    except pd.errors.ParserError:
        print(f"Error: The file {f} is not a valid CSV file.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


if __name__ == "__main__":
    calculate_subcategory_amounts()