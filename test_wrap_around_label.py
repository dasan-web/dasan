import fitz
from PIL import Image, ImageDraw, ImageOps
import os
import re

base_dir = r"C:\Share\DASAN\public\products_s"
base_bottle_path = r"c:\Share\DASAN\public\products\clpigrel_75mg.jpg"

def extract_label_strip_from_pdf(pdf_path):
  doc = fitz.open(pdf_path)
  page = doc[0]
  # Render PDF at 300 DPI
  pix = page.get_pixmap(dpi=300)
  pdf_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
  
  w, h = pdf_img.size
  gray = pdf_img.convert('L')
  inverted = ImageOps.invert(gray)
  bbox = inverted.getbbox()
  
  if not bbox:
    return pdf_img

  # In PDF blueprints (like 큐로리카 캡슐), there's a top specification table and a bottom label strip.
  # The bottom label strip is the printed label surrounded by outer box or borders.
  # If there is a top table, the label strip is located in the bottom 65% of the page.
  
  # Crop top table if height > width * 0.8
  if h > w * 0.7:
    # Top table is usually top 35%, label strip is bottom 65%
    label_region = pdf_img.crop((0, int(h * 0.35), w, h))
    l_gray = label_region.convert('L')
    l_bbox = ImageOps.invert(l_gray).getbbox()
    if l_bbox:
      pad = 5
      crop_x0 = max(0, l_bbox[0] - pad)
      crop_y0 = max(0, l_bbox[1] - pad)
      crop_x1 = min(w, l_bbox[2] + pad)
      crop_y1 = min(h, l_bbox[3] + pad)
      label_strip = label_region.crop((crop_x0, crop_y0, crop_x1, crop_y1))
    else:
      label_strip = label_region
  else:
    # Horizontal PDF label strip
    pad = 5
    crop_x0 = max(0, bbox[0] - pad)
    crop_y0 = max(0, bbox[1] - pad)
    crop_x1 = min(w, bbox[2] + pad)
    crop_y1 = min(h, bbox[3] + pad)
    label_strip = pdf_img.crop((crop_x0, crop_y0, crop_x1, crop_y1))

  return label_strip

def build_wrapped_bottle(pdf_path, out_file_path):
  label_strip = extract_label_strip_from_pdf(pdf_path)
  
  # Load base bottle mockup
  bottle = Image.open(base_bottle_path).convert('RGB')
  
  # Target bottle label region: x0=295, y0=360, w=410, h=450
  target_w, target_h = 410, 450
  
  # Resize the full label strip to fit the bottle label cylinder area
  resized_strip = label_strip.resize((target_w, target_h), Image.Resampling.LANCZOS)
  
  # Paste resized label strip onto bottle cylinder region
  bottle.paste(resized_strip, (295, 360))
  bottle.save(out_file_path, quality=98)
  print("Saved wrapped bottle image to:", out_file_path)

if __name__ == '__main__':
  # Test with 큐로리카 캡슐 PDF (Folder 83-84)
  pdf_curolica = r"C:\Share\DASAN\public\products_s\83-84. 큐로리카캡슐\큐로리카캡슐_150mg 30C-라벨.ai210202.pdf"
  if not os.path.exists(pdf_curolica):
    f_dir = r"C:\Share\DASAN\public\products_s\83-84. 큐로리카캡슐"
    pdf_curolica = os.path.join(f_dir, os.listdir(f_dir)[0])

  build_wrapped_bottle(pdf_curolica, "c:/Share/DASAN/public/products/test_curolica_wrapped.jpg")
