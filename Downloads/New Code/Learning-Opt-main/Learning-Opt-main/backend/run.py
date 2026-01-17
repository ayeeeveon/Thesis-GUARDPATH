import eventlet
eventlet.monkey_patch()

import os
from flask import Flask, send_from_directory
from flask_cors import CORS

from app.routes.auth import auth_bp
from app.routes.scan import scan_bp
from app.routes.history import history_bp
from app.socketio_instance import socketio

# ----------------------------
# Resolve frontend build path
# backend/run.py  ->  frontend/dist
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))

# Debug prints (helps you confirm the path is correct)
print("FRONTEND_DIST =", FRONTEND_DIST)
print("index exists? ", os.path.exists(os.path.join(FRONTEND_DIST, "index.html")))

# ----------------------------
# Flask app setup
# ----------------------------
app = Flask(
    __name__,
    static_folder=FRONTEND_DIST,
    static_url_path=""
)

# Allow API access (Pico, browser, etc.)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ----------------------------
# Register API blueprints
# IMPORTANT: url_prefix="/api"
# so your endpoints become /api/login, /api/scan, etc.
# ----------------------------
app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(scan_bp, url_prefix="/api")
app.register_blueprint(history_bp, url_prefix="/api")
# ----------------------------
# Attach Socket.IO
# ----------------------------
socketio.init_app(app, cors_allowed_origins="*")

# ----------------------------
# Serve React frontend
# ----------------------------
@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static_or_index(path):
    full_path = os.path.join(app.static_folder, path)

    # If the requested file exists (assets/js/css/images), serve it
    if os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)

    # Otherwise serve React's index.html (for React Router routes like /map, /history)
    return send_from_directory(app.static_folder, "index.html")

# ----------------------------
# Start server
# ----------------------------
if __name__ == "__main__":
    # For Pico stability, keep debug=False (no auto-reloader)
    socketio.run(app, host="0.0.0.0", port=5000, debug=False)
