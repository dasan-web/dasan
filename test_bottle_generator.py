import os
import math
from PIL import Image, ImageDraw, ImageFont

# Check available fonts
font_candidates = [
  "C:/Windows/Fonts/malgunbd.ttf", # Malgun Gothic Bold
  "C:/Windows/Fonts/malgun.ttf",   # Malgun Gothic
  "C:/Windows/Fonts/gulim.ttc"
]

font_bold_path = None
font_norm_path = None

for f in font_candidates:
  if os.path.exists(f):
    if not font_bold_path: font_bold_path = f
    if "bd" in f: font_bold_path = f
    if not font_norm_path: font_norm_path = f

print("Using fonts:", font_bold_path, font_norm_path)

# Let's inspect base bottle image if exists
base_bottle_path = "c:/Share/DASAN/public/products/clpigrel_75mg.jpg"
if os.path.exists(base_bottle_path):
  base_img = Image.open(base_bottle_path).convert('RGB')
  print("Base bottle image size:", base_img.size)
