from flask import Blueprint, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Create a blueprint
test = Blueprint('test', __name__)

# Configure Flask-Limiter to use the remote address as the key
limiter = Limiter(get_remote_address)
# Apply rate limiting specifically to this route
@test.route('/api/test', methods=['GET'])
@limiter.limit("7 per minute")  # Limit this route to 10 requests per minute
def api_test():
    print("got the call")
    return jsonify({"message": "This is a test response!"}), 200

