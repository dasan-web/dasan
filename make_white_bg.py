from PIL import Image
import numpy as np

img_path = 'c:/Share/DASAN/public/products/clpigrel_75mg.jpg'
img = Image.open(img_path).convert('RGB')
arr = np.array(img, dtype=np.float32)

# Convert light background pixels (near white/light grey studio bg) to pure 255, 255, 255
# Bottle body is white, but background is very uniform light grey (> 215)
# To preserve bottle details while making external background pure white:
# We find background corners: (0,0), (0, width-1), (height-1, 0), (height-1, width-1)

h, w, _ = arr.shape
corner_sample = np.mean([arr[0,0], arr[0, w-1], arr[h-1, 0], arr[h-1, w-1]])

print("Average corner background color:", corner_sample)

# Remap background luminosity so that anything lighter than 210 scales smoothly to 255
arr_gray = np.mean(arr, axis=2)
high_bright = arr_gray > 200

# Contrast stretch background to pure white
norm = np.clip((arr_gray - 180) / (corner_sample - 180), 0, 1)
factor = 1.0 + (1.05 / (norm + 0.05) - 1.0) * (arr_gray > 210)

for c in range(3):
    channel = arr[:, :, c]
    # For bright pixels, push towards 255
    channel_new = np.where(arr_gray > 215, 255.0 - (255.0 - channel) * 0.1, channel)
    channel_new = np.where(arr_gray > 235, 255.0, channel_new)
    arr[:, :, c] = channel_new

out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
out.save(img_path, quality=98)
print("Successfully processed pure white background!")
