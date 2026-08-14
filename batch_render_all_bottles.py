import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont

# Path definitions
python_exe = "C:/Users/송주섭-PC/AppData/Local/Python/bin/python.exe"
base_bottle_path = "c:/Share/DASAN/public/products/clpigrel_75mg.jpg"
output_dir = "c:/Share/DASAN/public/products"

os.makedirs(output_dir, exist_ok=True)

# Load base 1024x1024 3D bottle image
base_img = Image.open(base_bottle_path).convert('RGB')
w, h = base_img.size

# Fonts
font_bold_path = "C:/Windows/Fonts/malgunbd.ttf"
font_norm_path = "C:/Windows/Fonts/malgun.ttf"

font_title = ImageFont.truetype(font_bold_path, 42)
font_subtitle = ImageFont.truetype(font_bold_path, 22)
font_badge_num = ImageFont.truetype(font_bold_path, 26)
font_count = ImageFont.truetype(font_bold_path, 26)
font_type = ImageFont.truetype(font_bold_path, 14)

print("Bottle generator initialized. Canvas size:", w, h)
