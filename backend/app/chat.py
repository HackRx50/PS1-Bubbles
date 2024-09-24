from flask import Blueprint, request, jsonify
from utils.gemini import gemini_chat
from utils.utils import get_prompts
chat_bp = Blueprint('chat', __name__)



@chat_bp.route('/api/chat', methods=['POST'])
def handle_chat():
    # Extract message from the JSON request body
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Invalid input, message is required'}), 400
    
    message = data['message']
    
    response = gemini_chat(get_prompts('chat.txt')+message)
    
    # Return the response as JSON
    return jsonify({'response': response})
