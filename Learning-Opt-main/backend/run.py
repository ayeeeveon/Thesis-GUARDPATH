# run.py
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from app.routes.auth import auth_bp

import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Expose certain headers for frontend
@app.after_request
def expose_headers(resp):
    resp.headers["Access-Control-Expose-Headers"] = "Content-Disposition"
    return resp

# Register blueprints
app.register_blueprint(auth_bp)

# Quick ping endpoint
@app.route("/api/ping")
def ping():
    return jsonify(ok=True)

# Home route
@app.route("/")
def home():
    return "Hello, Creo Certificate Backend!"

# Run the app
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    host = os.environ.get('HOST', '127.0.0.1')
    app.run(host=host, port=port, debug=debug)
