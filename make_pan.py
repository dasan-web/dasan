import cv2
import numpy as np

# Load main.png and mask
img = cv2.imread('public/main.png')
mask = cv2.imread('mask_soft.png', cv2.IMREAD_GRAYSCALE)

height, width = img.shape[:2]

# Extract the lake using the mask
lake = cv2.bitwise_and(img, img, mask=mask)

# Create a seamless wide texture by mirroring the lake
# To make it seamlessly pan left to right, we can horizontally flip and concatenate
lake_flipped = cv2.flip(lake, 1)

# We want a texture that is 3x wide: original, flipped, original
wide_lake = np.hstack((lake, lake_flipped, lake))

cv2.imwrite('wide_lake.jpg', wide_lake)
print("Wide lake texture created.")
