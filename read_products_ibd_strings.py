import re

ibd_path = r"C:\Program Files\MariaDB 11.8\data\dasan_homepage\products.ibd"

print("Extracting strings from products.ibd...")
try:
  with open(ibd_path, "rb") as f:
    data = f.read()

  # Find printable UTF-8 strings
  strings = re.findall(rb'[\x20-\x7e\xe0-\xef\x80-\xbf]{4,}', data)
  
  decoded_set = set()
  for s in strings:
    try:
      dec = s.decode('utf-8')
      if any(k in dec for k in ['클피그렐', 'http', 'cloudinary', 'products', 'jpg', 'png', 'bottle']):
        decoded_set.add(dec)
    except:
      pass

  print(f"Found {len(decoded_set)} matching string segments:")
  for item in sorted(decoded_set):
    print(" ->", item)

except Exception as e:
  print("Error reading ibd:", e)
