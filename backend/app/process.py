# app/process.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
import pytesseract
from PIL import Image
import os
import csv

process_blueprint = Blueprint('process', __name__)

# Set the upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@process_blueprint.route('/', methods=['GET', 'POST'])
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
            
            # Extract text from the image using pytesseract
            extracted_text = pytesseract.image_to_string(Image.open(filepath))
            
            # Save extracted text to a CSV file
            csv_filename = 'extracted_text.csv'
            with open(csv_filename, mode='a', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([uploaded_file.filename, extracted_text])  # Corrected reference
            
            flash(f'Text extracted and saved to {csv_filename}')
            return redirect(url_for('process.index'))
    
    return render_template('index.html')