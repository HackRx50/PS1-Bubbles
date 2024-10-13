# app/process.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, send_file
import easyocr
from PIL import Image
import os
import csv
from utils.gemini import gemini_ocr,gemini_chat
from utils.utils import get_prompts,calculate_subcategory_amounts,convert_csv_rows_to_json,extract_images_from_pdf
import time
from config.config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from utils.decorators import time_it,log_api_runtime
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address




# ==================================================================================================================================
process_blueprint = Blueprint('process', __name__)

# reader = easyocr.Reader(['en'])

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@process_blueprint.route('/api/process', methods=['GET', 'POST'])
@log_api_runtime
def index():
    if request.method == 'POST':
        # Check if a file was uploaded
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        
        uploaded_file = request.files['file']  # Renamed variable to avoid conflict
        
        # If no file is selected
        if uploaded_file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension == 'pdf':
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            uploaded_file.save(filepath)
            list_of_images =extract_images_from_pdf(pdf_path=filepath)
            text = []
            for img in list_of_images:
                text.append(gemini_ocr(image_path=img, prompt = get_prompts('First.txt')))
            
            final_text = gemini_chat(prompt = get_prompts('pdf.txt').replace("ocr1",str(text)))
            final_text_clean = final_text.replace("```csv", "").replace("```","")
            lines = final_text_clean.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                print(f"total number of rows are {len(csv_rows)}")
                valid_rows = [
        row for row in csv_rows if any(cell.strip() and cell.strip().lower() != 'null' for cell in row)
    ]
                for row in valid_rows:
                    # if any(cell.strip() and cell.strip() != 'null' for cell in row):
                    writer.writerow(row)
                csvfile.close()
            time.sleep(0.5)
            subcategory_json = calculate_subcategory_amounts(valid_rows)
            csv_rows_json = convert_csv_rows_to_json(valid_rows)
            final_json={
                "csv_rows":csv_rows_json,
                "subcategory_json":subcategory_json,
                "rows":len(valid_rows)-1,
            }
            print(final_json)
            # return final_json
            return send_file("../uploads/extracted_text.csv")
            







        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the file to the upload folder
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            uploaded_file.save(filepath)
            
            # Extract text from the image using easyocr
            # extracted_text_easyocr = reader.readtext(filepath,detail=0)
            extracted_text_gemini = gemini_ocr(filepath, get_prompts('First.txt'))
            final_text = gemini_ocr(image_path=filepath, prompt = get_prompts('Second.txt').replace("ocr1",str(extracted_text_gemini)))
            final_text_clean = final_text.replace("```csv", "").replace("```","")
            # Save extracted text to a CSV file
            lines = final_text_clean.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                print(f"total number of rows are {len(csv_rows)}")
                valid_rows = [
        row for row in csv_rows if any(cell.strip() and cell.strip().lower() != 'null' for cell in row)
    ]
                for row in valid_rows:
                    # if any(cell.strip() and cell.strip() != 'null' for cell in row):
                    writer.writerow(row)   # Corrected reference
                csvfile.close()
            # with open(csv_filename, mode='r', newline='', encoding='utf-8') as csvreader:
            time.sleep(0.5)
            subcategory_json=calculate_subcategory_amounts(valid_rows)
            csv_rows_json = convert_csv_rows_to_json(valid_rows)

            final_json = {
                "csv_rows_data": csv_rows_json,
                "subcategory_data": subcategory_json,
                "rows":len(valid_rows)-1,
            }
            print(final_json)
            flash(f'Text extracted and saved to {csv_filename}')
            
            return send_file("../uploads/extracted_text.csv")
            # return final_json
            # return redirect(url_for('process.index'))
    
    return render_template('index.html')



@process_blueprint.route('/api/process-new', methods=['GET', 'POST'])
@log_api_runtime
def index_new():
    if request.method == 'POST':
        # Check if a file was uploaded
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        
        uploaded_file = request.files['file']  # Renamed variable to avoid conflict
        
        # If no file is selected
        if uploaded_file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension == 'pdf':
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            uploaded_file.save(filepath)
            list_of_images =extract_images_from_pdf(pdf_path=filepath)
            text = []
            for img in list_of_images:
                text.append(gemini_ocr(image_path=img, prompt = get_prompts('First.txt')))
            
            final_text = gemini_chat(prompt = get_prompts('pdf.txt').replace("ocr1",str(text)))
            final_text_clean = final_text.replace("```csv", "").replace("```","")
            lines = final_text_clean.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                print(f"total number of rows are {len(csv_rows)}")
                valid_rows = [
        row for row in csv_rows if any(cell.strip() and cell.strip().lower() != 'null' for cell in row)
    ]
                for row in valid_rows:
                    # if any(cell.strip() and cell.strip() != 'null' for cell in row):
                    writer.writerow(row)
                csvfile.close()
            time.sleep(0.5)
            subcategory_json = calculate_subcategory_amounts(valid_rows)
            csv_rows_json = convert_csv_rows_to_json(valid_rows)
            final_json={
                "csv_rows":csv_rows_json,
                "subcategory_json":subcategory_json,
                "rows":len(valid_rows)-1,
            }
            print(final_json)
            return final_json
            







        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the file to the upload folder
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            uploaded_file.save(filepath)
            
            # Extract text from the image using easyocr
            # extracted_text_easyocr = reader.readtext(filepath,detail=0)
            extracted_text_gemini = gemini_ocr(filepath, get_prompts('First.txt'))
            final_text = gemini_ocr(image_path=filepath, prompt = get_prompts('Second.txt').replace("ocr1",str(extracted_text_gemini)))
            final_text_clean = final_text.replace("```csv", "").replace("```","")
            # Save extracted text to a CSV file
            lines = final_text_clean.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                print(f"total number of rows are {len(csv_rows)}")
                valid_rows = [
        row for row in csv_rows if any(cell.strip() and cell.strip().lower() != 'null' for cell in row)
    ]
                for row in valid_rows:
                    # if any(cell.strip() and cell.strip() != 'null' for cell in row):
                    writer.writerow(row)   # Corrected reference
                csvfile.close()
            # with open(csv_filename, mode='r', newline='', encoding='utf-8') as csvreader:
            time.sleep(0.5)
            subcategory_json=calculate_subcategory_amounts(valid_rows)
            csv_rows_json = convert_csv_rows_to_json(valid_rows)

            final_json = {
                "csv_rows_data": csv_rows_json,
                "subcategory_data": subcategory_json,
                "rows":len(valid_rows)-1,
            }
            print(final_json)
            flash(f'Text extracted and saved to {csv_filename}')
            return final_json
            # return send_file("../uploads/extracted_text.csv")x
            # return redirect(url_for('process.index'))
    
    return render_template('index.html')
