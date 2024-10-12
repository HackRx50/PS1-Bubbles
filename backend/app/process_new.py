import asyncio
from concurrent.futures import ThreadPoolExecutor
import easyocr
from utils.gemini import gemini_ocr
from utils.utils import get_prompts
import csv
from config.config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from flask import Blueprint, render_template, request, redirect, url_for, flash, send_file
import os 
import aiofiles
import time
from utils.decorators import time_it,log_api_runtime
process_blueprint = Blueprint('process', __name__)
# Set up EasyOCR reader
reader = easyocr.Reader(['en'])

# Create a ThreadPoolExecutor for running blocking functions asynchronously
executor = ThreadPoolExecutor()
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Helper function to run blocking code in executor
async def run_in_executor(func, *args):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, func, *args)

# Define your async process function
@time_it
async def process_file(filepath):
    # Stage 1: Run EasyOCR and Gemini OCR concurrently
    easyocr_task = run_in_executor(reader.readtext, filepath)
    gemini_task = run_in_executor(gemini_ocr, filepath, get_prompts('First.txt'))

    # Gather results from both concurrently executed tasks
    extracted_text_easyocr, extracted_text_gemini = await asyncio.gather(easyocr_task, gemini_task)

    # Stage 2: Use the results of both tasks to execute the final step
    final_text = await run_in_executor(
        gemini_ocr,
        filepath,
        get_prompts('Second.txt')
            .replace("ocr1", str(extracted_text_easyocr))
            .replace("ocr2", str(extracted_text_gemini))
    )

    return final_text

# Example usage in your route

@process_blueprint.route('/api/process', methods=['POST'])
@log_api_runtime
async def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

        uploaded_file = request.files['file']

        if uploaded_file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if uploaded_file and allowed_file(uploaded_file.filename):
            # Save the uploaded file asynchronously
            filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
            async with aiofiles.open(filepath, 'wb') as f:
                await f.write(uploaded_file.read())

            # Call the async processing function
            final_text = await process_file(filepath)

            # Save final text to CSV or do something with final_text...
            flash('Processing completed')
            lines = final_text.split('\n')  # Split text into lines
            csv_rows = [line.split(',') for line in lines]  # Split each line into columns
            
            # Write the rows to the CSV file
            csv_filename = os.path.join(UPLOAD_FOLDER, 'extracted_text.csv')
            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                for row in csv_rows:
                    writer.writerow(row)   # Corrected reference
                csvfile.close()
            time.sleep(0.5)
            flash(f'Text extracted and saved to {csv_filename}')
            return send_file("../uploads/extracted_text.csv")
            # return redirect(url_for('index'))  # Adjust this based on your app logic

    return render_template('index.html')
