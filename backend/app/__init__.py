from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
def create_app():

    app = Flask(__name__)
    CORS(app)
    
    app.config['SECRET_KEY'] = 'the random string'
    limiter = Limiter(
        get_remote_address,  # Rate limiting based on the request's remote address
        app=app,  # Attach limiter to this app instance
        default_limits=["7 per minute"]  # Default limit of 10 requests per minute
    )
    
    from .process import process_blueprint
    from .chat import chat_bp
    from .frontend import frontend
    from .test_route import test
    app.register_blueprint(process_blueprint)  
    app.register_blueprint(chat_bp)
    app.register_blueprint(frontend)
    app.register_blueprint(test)
    return app  # Return the app instance
