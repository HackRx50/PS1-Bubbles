# app/process.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, send_file
import easyocr
from PIL import Image
import os
import csv
from utils.gemini import gemini_ocr
from utils.utils import get_prompts,calculate_subcategory_amounts
import time
from config.config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from utils.decorators import time_it,log_api_runtime
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address




# ==================================================================================================================================
process_blueprint = Blueprint('process', __name__)

reader = easyocr.Reader(['en'])

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
        
        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the file to the upload folder
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            uploaded_file.save(filepath)
            
            # Extract text from the image using easyocr
            # extracted_text_easyocr = reader.readtext(filepath,detail=0)
            extracted_text_gemini = gemini_ocr(filepath, get_prompts('First.txt'))
            final_text = gemini_ocr(image_path=filepath, prompt = get_prompts('Second.txt').replace("ocr1",str(extracted_text_gemini)))
            # Save extracted text to a CSV file
            lines = final_text.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                print(f"total number of rows are {len(csv_rows)}")
                for row in csv_rows:
                    if any(cell.strip() and cell.strip() != 'null' for cell in row):
                        writer.writerow(row)   # Corrected reference
                csvfile.close()
            # with open(csv_filename, mode='r', newline='', encoding='utf-8') as csvreader:
            time.sleep(0.5)
            print(calculate_subcategory_amounts(csv_rows))
            
            flash(f'Text extracted and saved to {csv_filename}')
            return send_file("../uploads/extracted_text.csv")
            # return redirect(url_for('process.index'))
    
    return render_template('index.html')
