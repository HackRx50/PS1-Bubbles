from dotenv import load_dotenv
import os
load_dotenv()   

GEMINI_KEY = os.getenv(key='GEMINI_KEY')
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}