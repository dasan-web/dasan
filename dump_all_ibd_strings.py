import re

ibd_path = r"C:\Program Files\MariaDB 11.8\data\dasan_homepage\products.ibd"

with open(ibd_path, "rb") as f:
  data = f.read()

# Extract Korean / UTF-8 strings
pattern = re.compile(rb'(?:[\xeb-\xed][\x80-\xbf]{2})+')
matches = pattern.findall(data)

korean_words = set()
for m in matches:
  try:
    s = m.decode('utf-8')
    if len(s) >= 2:
      korean_words.add(s)
  except:
    pass

print(f"Total unique Korean words found in products.ibd: {len(korean_words)}")
for w in sorted(korean_words)[:30]:
  print(" ->", w)
