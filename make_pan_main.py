import cv2
import numpy as np

img = cv2.imread('public/main.png')
height, width = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold to find the lake in main.png. The sky is bright.
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

lake_contour = None
max_area = 0
cx, cy = width // 2, height // 2

for cnt in contours:
    area = cv2.contourArea(cnt)
    M = cv2.moments(cnt)
    if M["m00"] != 0:
        cX = int(M["m10"] / M["m00"])
        cY = int(M["m01"] / M["m00"])
        if abs(cX - cx) < 200 and abs(cY - cy) < 200:
            if area > max_area:
                max_area = area
                lake_contour = cnt

mask = np.zeros((height, width), dtype=np.uint8)

if lake_contour is not None:
    hull = cv2.convexHull(lake_contour)
    cv2.fillPoly(mask, [hull], 255)
    
    # Erode the mask to stay inside the lake
    kernel = np.ones((15,15), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=1)
    
    mask_blur = cv2.GaussianBlur(mask, (31, 31), 0)
    cv2.imwrite('mask_main.png', mask_blur)
    
    # Extract lake
    lake = cv2.bitwise_and(img, img, mask=mask_blur)
    
    # Mirror horizontally to make a tileable texture
    lake_flipped = cv2.flip(lake, 1)
    
    # Concatenate horizontally: original -> flipped -> original
    wide_lake = np.hstack((lake, lake_flipped, lake))
    cv2.imwrite('wide_lake.png', wide_lake)
    
    print("Mask and wide texture created successfully.")
else:
    print("Failed to find lake in main.png")
