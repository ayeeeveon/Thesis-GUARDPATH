from flask import Blueprint, request, jsonify
from app.db import get_conn

history_bp = Blueprint("history", __name__)

@history_bp.get("/history")
def history():
    building = request.args.get("building", "").strip()
    room = request.args.get("room", "").strip()
    limit = int(request.args.get("limit", "200"))

    sql = """
        SELECT building, room, issue_reported, created_at
        FROM scans
        WHERE (%s = '' OR building = %s)
          AND (%s = '' OR room = %s)
        ORDER BY created_at DESC
        LIMIT %s
    """

    conn = get_conn()
    try:
        with conn.cursor() as cur:   # DictCursor because of db.py
            cur.execute(sql, (building, building, room, room, limit))
            rows = cur.fetchall()    # list of dicts

        # Convert created_at to string (JSON safe)
        for r in rows:
            if "created_at" in r and r["created_at"] is not None:
                r["created_at"] = str(r["created_at"])

        return jsonify({"ok": True, "data": rows})

    finally:
        conn.close()
