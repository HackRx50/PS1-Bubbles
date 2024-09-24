from flask import Flask
from flask_cors import CORS
def create_app():

    app = Flask(__name__, template_folder='../templates')
    CORS(app)
    
    app.config['SECRET_KEY'] = 'the random string'
    
    
    from .process import process_blueprint
    from .chat import chat_bp
    app.register_blueprint(process_blueprint)  
    app.register_blueprint(chat_bp)
    return app  # Return the app instance
