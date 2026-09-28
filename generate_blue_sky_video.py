import subprocess
import sys
import time
import cv2
import numpy as np

def main():
    print("Loading assets...")
    main_poster = cv2.imread('public/main_poster.jpg')
    if main_poster is None:
        print("Error: Could not load public/main_poster.jpg")
        sys.exit(1)
        
    h_img, w_img, _ = main_poster.shape
    
    sky = cv2.imread('scratch/sky_clouds.jpg')
    if sky is None:
        print("Error: Could not load scratch/sky_clouds.jpg")
        sys.exit(1)
        
    mask = cv2.imread('mask_soft.png', cv2.IMREAD_GRAYSCALE)
    if mask is None:
        print("Error: Could not load mask_soft.png")
        sys.exit(1)

    y_idx, x_idx = np.where(mask > 5)
    x0, x1 = x_idx.min(), x_idx.max()
    y0, y1 = y_idx.min(), y_idx.max()
    w_lake = x1 - x0
    h_lake = y1 - y0

    print(f"Lake bbox: x[{x0}:{x1}] w={w_lake}, y[{y0}:{y1}] h={h_lake}")

    # Seamless panoramic sky strip
    sky_sub = sky[60:720, :].copy() # 660 height
    h_sub, w_sub, _ = sky_sub.shape
    O = 350
    P = w_sub - O  # 1026

    strip = np.zeros((h_sub, P, 3), dtype=np.float32)
    strip[:, :P - O] = sky_sub[:, O:P].astype(np.float32)
    u = np.linspace(0, 1, O, endpoint=False)
    alpha_s = (3 * u**2 - 2 * u**3)[np.newaxis, :, np.newaxis]
    strip[:, P - O:P] = (1.0 - alpha_s) * sky_sub[:, P:w_sub] + alpha_s * sky_sub[:, :O]
    strip = np.clip(strip, 0, 255).astype(np.uint8)

    # Triple strip for wide sampling
    strip_triple = np.hstack([strip, strip, strip])

    gy, gx = np.mgrid[0:h_lake, 0:w_lake].astype(np.float32)
    sample_w = int(w_lake * (w_sub / 1200.0))
    scale_u = sample_w / float(w_lake)
    scale_v = (h_sub - 50) / float(h_lake)

    alpha_mask = (mask[y0:y1, x0:x1] / 255.0)[:, :, np.newaxis]
    lake_bg = main_poster[y0:y1, x0:x1].astype(np.float32)

    FPS = 30
    DURATION_SEC = 20
    TOTAL_FRAMES = FPS * DURATION_SEC  # 600 frames
    print(f"Rendering {TOTAL_FRAMES} frames ({DURATION_SEC}s at {FPS}fps)...")

    # Start ffmpeg pipe
    ffmpeg_cmd = [
        'ffmpeg',
        '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{w_img}x{h_img}',
        '-pix_fmt', 'bgr24',
        '-r', str(FPS),
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '18',
        '-g', str(FPS),
        '-keyint_min', str(FPS),
        '-sc_threshold', '0',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        'public/main_clouds.mp4'
    ]

    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    t_start = time.time()
    for n in range(TOTAL_FRAMES):
        t_frac = float(n) / TOTAL_FRAMES
        shift_px = t_frac * P
        
        # Harmonic water ripples (exact integer cycles over TOTAL_FRAMES)
        phase1 = 2 * np.pi * (8 * t_frac)
        phase2 = 2 * np.pi * (13 * t_frac)
        
        rip_x = 2.2 * np.sin(gx * 0.05 + gy * 0.03 + phase1) + 1.2 * np.cos(gx * 0.08 - gy * 0.06 + phase2)
        rip_y = 1.6 * np.cos(gx * 0.04 + gy * 0.05 + phase1) + 1.0 * np.sin(gx * 0.07 - gy * 0.04 + phase2)
        
        vert_shift = 6.0 * np.sin(2 * np.pi * t_frac)
        
        map_x = P + shift_px + (gx + rip_x) * scale_u
        map_y = 25.0 + vert_shift + (gy + rip_y) * scale_v
        
        sky_sampled = cv2.remap(strip_triple, map_x.astype(np.float32), map_y.astype(np.float32), 
                                interpolation=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        
        water = sky_sampled.astype(np.float32) * 0.90 + lake_bg * 0.10
        composite = lake_bg * (1.0 - alpha_mask) + water * alpha_mask
        
        frame = main_poster.copy()
        frame[y0:y1, x0:x1] = np.clip(composite, 0, 255).astype(np.uint8)
        
        proc.stdin.write(frame.tobytes())
        
        if (n + 1) % 100 == 0:
            print(f"Rendered {n + 1}/{TOTAL_FRAMES} frames ({(n + 1) / TOTAL_FRAMES * 100:.0f}%)")

    proc.stdin.close()
    proc.wait()
    t_end = time.time()
    print(f"Finished rendering {TOTAL_FRAMES} frames in {t_end - t_start:.1f}s!")
    print(f"Output saved to public/main_clouds.mp4")

if __name__ == '__main__':
    main()
