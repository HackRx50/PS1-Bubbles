
from flask import Flask

def create_app():
    app = Flask(__name__, template_folder='../templates')
    app.config['SECRET_KEY'] = 'the random string'    
    from .process import process_blueprint
    app.register_blueprint(process_blueprint)
    
    return app
