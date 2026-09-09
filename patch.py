
import cv2
import numpy as np

img = cv2.imread('public/main_poster.jpg')
if img is None:
    print('No image')
    exit()

h, w = img.shape[:2]

# Convert to grayscale and threshold to find the lake (sky reflection is bright)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

lake = None
max_a = 0
for cnt in contours:
    a = cv2.contourArea(cnt)
    if a > 100000: # large enough
        if a > max_a:
            max_a = a
            lake = cnt

if lake is None:
    print('Lake not found')
    exit()

# We found the lake contour.
# The user wants to hide the awkward bushes at the bottom inside edge of the lake.
# We can create a mask that covers the inner bottom edge of the lake.
lake_mask = np.zeros((h, w), np.uint8)
cv2.drawContours(lake_mask, [lake], -1, 255, -1)

# Erode the lake mask to find the inner rim
inner_mask = np.zeros((h, w), np.uint8)
cv2.drawContours(inner_mask, [lake], -1, 255, 120) # Draw a thick border

# We only want the bottom part of this inner border
bottom_mask = np.zeros((h, w), np.uint8)
bottom_mask[h//2 + 50 : h - 100, :] = 255

target_area = cv2.bitwise_and(inner_mask, bottom_mask)
# Also intersect with the lake mask so we only get the inside part
target_area = cv2.bitwise_and(target_area, lake_mask)

# Blur the mask to make it soft
alpha = cv2.GaussianBlur(target_area, (99, 99), 0)

# We want to fill this target area with trees.
# We can just shift the original image UP by 60 pixels so the trees below the lake move up into the lake!
shifted_img = np.zeros_like(img)
shift = 100
shifted_img[:-shift, :] = img[shift:, :]

# Create RGBA
overlay = np.zeros((h, w, 4), dtype=np.uint8)
overlay[:, :, :3] = shifted_img
overlay[:, :, 3] = alpha

cv2.imwrite('public/tree_patch.png', overlay)
print('Saved tree_patch.png')

