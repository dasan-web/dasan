import cv2
import numpy as np

img = cv2.imread('frame.png')
height, width = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 130, 255, cv2.THRESH_BINARY)
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
        if abs(cX - cx) < 400 and abs(cY - cy) < 400:
            if area > max_area:
                max_area = area
                lake_contour = cnt

mask = np.zeros((height, width), dtype=np.uint8)

if lake_contour is not None:
    hull = cv2.convexHull(lake_contour)
    cv2.fillPoly(mask, [hull], 255)
    
    # Erode the mask to stay well inside the lake, avoiding tree reflections
    kernel = np.ones((50,50), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=1)
    
    # Blur the mask to make the transition smooth
    mask = cv2.GaussianBlur(mask, (101, 101), 0)
    
    cv2.imwrite('mask_soft.png', mask)
    print("Soft mask created successfully.")
