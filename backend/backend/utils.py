import hashlib, random, string, qrcode, base64, os
from io import BytesIO
from PIL import Image

SAVE_PATH = "generated_html"
os.makedirs(SAVE_PATH, exist_ok=True)

def generate_short_code(name: str):
    salt = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
    return hashlib.sha256((name + salt).encode()).hexdigest()[:8]

def generate_qr_and_html(name: str, target_url: str, code: str):
    # Generate QR code
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
    qr.add_data(target_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#691258", back_color="white").resize((400, 400), Image.LANCZOS)

    # Convert QR to base64
    buf = BytesIO()
    img.save(buf, format="PNG")
    qr_b64 = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()

    # Generate masking HTML
    html_content = f"""<!DOCTYPE html>
<html><head><meta charset='UTF-8'><title>{name} | Rasacode</title></head>
<body style="margin:0;height:100%;background:#0f0f0f">
<iframe src="{target_url}" frameborder="0" style="width:100%;height:100%;border:none"></iframe>
</body></html>"""

    html_file = os.path.join(SAVE_PATH, f"{code}.html")
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    return qr_b64, html_file
