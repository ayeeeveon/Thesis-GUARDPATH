from flask import Blueprint, request, jsonify
import time
from app.db import get_conn
from app.socketio_instance import socketio

scan_bp = Blueprint("scan", __name__, url_prefix="/api")

# ✅ Convert Pico backend room names -> UI/DB room labels
ROOM_MAP = {
    "Room 1": "S-101",
    "Room 2": "S-102",
    "Room 3": "S-103",
    "Room 4": "S-104",
    # add more if needed
}

@scan_bp.post("/scan")
def scan():
    data = request.get_json(force=True) or {}

    device_id = data.get("device_id", "pico1")
    raw_room = data.get("room", "Unknown")
    room = ROOM_MAP.get(raw_room, raw_room)  # ✅ convert here
    uid = data.get("uid", "unknown")
    ts = int(data.get("ts") or time.time())

    # Save to MySQL
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO scans (device_id, room, uid, ts) VALUES (%s,%s,%s,%s)",
                (device_id, room, uid, ts),
            )
    finally:
        conn.close()

    payload = {"device_id": device_id, "room": room, "uid": uid, "ts": ts}

    # WebSocket push to frontend (Socket.IO event)
    socketio.emit("scan", payload)

    return jsonify({"ok": True, "data": payload})
