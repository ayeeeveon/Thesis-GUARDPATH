import pymysql

DB_HOST = "127.0.0.1"
DB_USER = "root"
DB_PASS = "Pasaway1221@#"   # <-- change this
DB_NAME = "guardpath"

def get_conn():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
