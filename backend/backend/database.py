import sqlite3
import os

DB_NAME = "urls.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS short_urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            short_code TEXT UNIQUE,
            employee_name TEXT,
            target_url TEXT,
            tiny_url TEXT,
            html_file TEXT
        )
    """)
    conn.commit()
    conn.close()

def save_record(short_code, employee_name, target_url, tiny_url, html_file):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR REPLACE INTO short_urls (short_code, employee_name, target_url, tiny_url, html_file) VALUES (?, ?, ?, ?, ?)",
        (short_code, employee_name, target_url, tiny_url, html_file)
    )
    conn.commit()
    conn.close()
