# routes/auth.py
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import logging

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)  # enable CORS for this blueprint

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hardcoded demo user
DEMO_USER = {
    "id": 1,
    "username": "admin",
    "password": "password123"  # plaintext for demo only
}

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    logger.info(f"🔒 Received login request: {data}")

    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if username != DEMO_USER['username'] or password != DEMO_USER['password']:
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({
        "user": {
            "id": DEMO_USER['id'],
            "username": DEMO_USER['username']
        }
    })
