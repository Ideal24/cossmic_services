# # main.py
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import hashlib, random, string, base64, qrcode
# from io import BytesIO
# from PIL import Image
# import os

# app = FastAPI()

# class EmployeeData(BaseModel):
#     employee_name: str
#     target_url: str

# # Your domain
# TINY_DOMAIN = "https://rasacode.in"
# SAVE_PATH = "generated_html"

# if not os.path.exists(SAVE_PATH):
#     os.makedirs(SAVE_PATH)

# @app.post("/shorten")
# def generate_qr_and_tinyurl(data: EmployeeData):
#     employee_name = data.employee_name.strip()
#     target_url = data.target_url.strip()

#     if not employee_name or not target_url:
#         raise HTTPException(status_code=400, detail="Employee name and target URL are required.")

#     # Generate hashed code
#     salt = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
#     hashed_code = hashlib.sha256((employee_name + salt).encode()).hexdigest()[:8]
#     tiny_url = f"{TINY_DOMAIN}/{hashed_code}"

#     # Generate QR (for actual URL)
#     qr = qrcode.QRCode(
#         version=1,
#         error_correction=qrcode.constants.ERROR_CORRECT_H,
#         box_size=10,
#         border=4,
#     )
#     qr.add_data(target_url)
#     qr.make(fit=True)
#     img = qr.make_image(fill_color="#691258", back_color="white")
#     high_res = img.resize((400, 400), Image.LANCZOS)

#     # Convert QR to base64
#     buf = BytesIO()
#     high_res.save(buf, format="PNG")
#     qr_b64 = base64.b64encode(buf.getvalue()).decode()
#     file_name = f"{employee_name}_rasacode_QR.png"

#     # Masking HTML page
#     html_content = f"""<!DOCTYPE html>
# <html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>
# <title>{employee_name} | Rasacode</title></head>
# <body style='margin:0;height:100%;background:#0f0f0f'>
# <iframe src="{target_url}" frameborder="0" style="width:100%;height:100%;border:none;"></iframe>
# </body></html>
# """

#     # Save the masking file locally (for hosting)
#     html_file = os.path.join(SAVE_PATH, f"{hashed_code}.html")
#     with open(html_file, "w", encoding="utf-8") as f:
#         f.write(html_content)

#     return {
#         "tiny_url": tiny_url,
#         "qr_code": f"data:image/png;base64,{qr_b64}",
#         "file_name": file_name,
#         "html_path": html_file
#     }


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils import generate_qr_and_html, generate_short_code
from database import save_record, init_db
import os

app = FastAPI()

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    init_db()

TINY_DOMAIN = "https://rasacode.in"

class QRRequest(BaseModel):
    employee_name: str
    target_url: str

@app.post("/shorten")
def create_short_link(data: QRRequest):
    short_code = generate_short_code(data.employee_name)
    tiny_url = f"{TINY_DOMAIN}/{short_code}"

    qr_b64, html_file = generate_qr_and_html(data.employee_name, data.target_url, short_code)

    # Save record to DB
    save_record(short_code, data.employee_name, data.target_url, tiny_url, html_file)

    return {
        "tiny_url": tiny_url,
        "qr_code": qr_b64,
        "file_name": f"{data.employee_name}_rasacode_QR.png"
    }
