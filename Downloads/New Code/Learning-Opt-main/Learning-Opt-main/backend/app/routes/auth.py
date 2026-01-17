# routes/auth.py

from flask import Blueprint, request, jsonify
from flask_cors import CORS
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)

# Hard-coded credential using email
HARDCODED_USER = {
    "email": "admin@example.com",
    "password": "password123",  # plaintext password
    "id": 1
}

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    logger.info(f"🔒 Received login request: {data}")
    
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    
    if not email or not password:
        logger.error("❌ Missing credentials")
        return jsonify({"message": "Email and password are required"}), 400
    
    # Check against hard-coded credential
    if email != HARDCODED_USER["email"] or password != HARDCODED_USER["password"]:
        logger.error(f"❌ Invalid login attempt for email: {email}")
        return jsonify({"message": "Invalid email or password"}), 401
    
    logger.info(f"✅ User logged in successfully: {email}")
    return jsonify({
        "user": {
            "id": HARDCODED_USER["id"],
            "email": HARDCODED_USER["email"]
        }
    })
