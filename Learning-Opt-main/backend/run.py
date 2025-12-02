"""
from flask import Flask
from flask_cors import CORS
from openpyxl.packaging import core

from app.routes.auth import auth_bp

import pandas 

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})

# Blueprints
app.register_blueprint(auth_bp)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
    """