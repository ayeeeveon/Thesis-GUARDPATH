# backend/app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # app.config.from_pyfile('config.py', silent=True)  

    CORS(app)

    @app.route('/')
    def index():
        return 'Backend server is running'

    

    return app
