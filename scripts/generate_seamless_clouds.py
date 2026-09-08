import cv2
import numpy as np
import subprocess
import os

def main():
    print("Loading assets...")
    main_img = cv2.imread('public/main.png') # (1536, 2760, 3)
    sky_img = cv2.imread('public/sky_clouds.jpg') # (768, 1376, 3)
    feathered_mask = np.load('feathered_mask.npy') # (1536, 2760), float32 in [0, 1]

    h_main, w_main = main_img.shape[:2]
    h_sky, w_sky = sky_img.shape[:2]

    # Lake bounding box: x=1153, y=712, w=512, h=309
    x_lake, y_lake, w_lake, h_lake = 1153, 712, 512, 309

    # 1. Create horizontally seamless sky panorama
    S = 250 # Seam blending width
    P = w_sky - S # Seamless period width (1126 px)

    left = sky_img[:, :S].astype(np.float32)
    right = sky_img[:, -S:].astype(np.float32)
    t = np.linspace(0, np.pi, S).reshape(1, S, 1)
    alpha = (1.0 - np.cos(t)) / 2.0

    blended_seam = (1.0 - alpha) * right + alpha * left
    periodic_sky = np.zeros((h_sky, P, 3), dtype=np.float32)
    periodic_sky[:, :S] = blended_seam
    periodic_sky[:, S:] = sky_img[:, S:P]

    # Increase sky vibrancy and cloud contrast slightly for pristine reflection
    # Boost saturation slightly in HSV
    hsv_sky = cv2.cvtColor(np.clip(periodic_sky, 0, 255).astype(np.uint8), cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv_sky[:, :, 1] = np.clip(hsv_sky[:, :, 1] * 1.15, 0, 255) # 15% more vibrant azure
    hsv_sky[:, :, 2] = np.clip(hsv_sky[:, :, 2] * 1.05, 0, 255) # 5% brighter clouds
    periodic_sky = cv2.cvtColor(hsv_sky.astype(np.uint8), cv2.COLOR_HSV2BGR).astype(np.float32)

    # Lake crop parameters
    # The sky window mapped into the lake (512x309)
    # Let's map a 400px height window of sky
    sky_win_h = 420
    sky_win_w = int(sky_win_h * (w_lake / h_lake)) # 420 * (512/309) ~ 696 px
    sky_y_start = (h_sky - sky_win_h) // 2

    # Animation parameters
    fps = 30
    duration = 20 # 20 seconds loop
    total_frames = fps * duration # 600 frames

    # Clouds drift from LEFT to RIGHT:
    # At t=0, offset = 0.
    # In one period P (1126 px), we drift exactly 1 * P pixels across 600 frames!
    # So v = P / total_frames
    # For clouds to drift to the right:
    # sky_x = (start_x - (frame / total_frames) * P) % P

    # 3-channel alpha mask for fast vector blending
    alpha_3d = np.repeat(feathered_mask[:, :, np.newaxis], 3, axis=2)
    inv_alpha_3d = 1.0 - alpha_3d
    static_background = main_img.astype(np.float32) * inv_alpha_3d
    base_lake_tint = main_img[y_lake:y_lake+h_lake, x_lake:x_lake+w_lake].astype(np.float32)

    # Grid for lake coordinates
    grid_y, grid_x = np.mgrid[0:h_lake, 0:w_lake]

    # Water reflection grid
    out_raw_file = 'temp_clouds_raw.mp4'
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(out_raw_file, fourcc, fps, (w_main, h_main))

    print(f"Rendering {total_frames} frames ({duration}s at {fps}fps)...")

    # Double periodic_sky to easily sample with wrapping
    sky_extended = np.hstack([periodic_sky, periodic_sky, periodic_sky])

    for frame_idx in range(total_frames):
        # Progress ratio [0, 1)
        tau = frame_idx / total_frames
        
        # Exact periodic drift from left to right
        # Sample position in periodic sky
        drift_px = (tau * P) % P
        # To make clouds drift left-to-right, texture offset moves backward
        sample_x_base = P + (P - drift_px) # in middle segment of sky_extended

        # Subtle periodic water ripples (frequencies must be integer multiples of 2*pi over the loop)
        # 4 full oscillation cycles over 20s (period = 5s)
        # 6 full oscillation cycles over 20s (period = 3.33s)
        phase4 = 2.0 * np.pi * 4 * tau
        phase6 = 2.0 * np.pi * 6 * tau
        
        ripple_dx = 1.5 * np.sin(2.0 * np.pi * grid_y / 38.0 + phase4) + 0.8 * np.sin(2.0 * np.pi * grid_y / 20.0 - phase6)
        ripple_dy = 1.0 * np.cos(2.0 * np.pi * grid_x / 45.0 + phase4) + 0.5 * np.cos(2.0 * np.pi * grid_x / 25.0 - phase6)

        # Coordinate mapping for remap
        # Map (grid_x, grid_y) to sky window coordinates
        map_x = sample_x_base + (grid_x / w_lake) * sky_win_w + ripple_dx * (sky_win_w / w_lake)
        map_y = sky_y_start + (grid_y / h_lake) * sky_win_h + ripple_dy * (sky_win_h / h_lake)

        map_x = map_x.astype(np.float32)
        map_y = np.clip(map_y, 0, h_sky - 1).astype(np.float32)

        # Sample from sky_extended with bilinear interpolation
        water_sky = cv2.remap(sky_extended, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

        # Blend with lake depth tone: 85% sky reflection + 15% water depth tone
        # and subtle brightness variation
        water_composite = water_sky * 0.88 + base_lake_tint * 0.12

        # Place into full frame
        frame = main_img.copy()
        lake_patch = frame[y_lake:y_lake+h_lake, x_lake:x_lake+w_lake].astype(np.float32)
        patch_alpha = alpha_3d[y_lake:y_lake+h_lake, x_lake:x_lake+w_lake]

        blended_patch = lake_patch * (1.0 - patch_alpha) + water_composite * patch_alpha
        frame[y_lake:y_lake+h_lake, x_lake:x_lake+w_lake] = np.clip(blended_patch, 0, 255).astype(np.uint8)

        writer.write(frame)

        if (frame_idx + 1) % 60 == 0:
            print(f"Rendered {frame_idx + 1}/{total_frames} frames ({((frame_idx + 1)/total_frames)*100:.0f}%)...")

    writer.release()
    print("Raw render complete. Verifying seamless loop seam between frame 0 and frame 599...")

    cap = cv2.VideoCapture(out_raw_file)
    ret, f0 = cap.read()
    cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames - 1)
    ret, f_last = cap.read()
    cap.release()

    diff_seam = cv2.absdiff(f0, f_last)
    lake_diff = diff_seam[y_lake:y_lake+h_lake, x_lake:x_lake+w_lake]
    print(f"Loop seam diff in lake: max={lake_diff.max()}, mean={lake_diff.mean():.4f}")

    # 4. Convert to web-optimized H.264 MP4 with ffmpeg
    final_output = 'public/main_clouds.mp4'
    print(f"Compressing to web-optimized {final_output} using ffmpeg...")

    cmd = [
        r"C:\Users\송주섭-PC\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe",
        "-y",
        "-i", out_raw_file,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        final_output
    ]

    subprocess.run(cmd, check=True)
    if os.path.exists(out_raw_file):
        os.remove(out_raw_file)
    print("SUCCESS! Generated seamless 20s loop video in public/main_clouds.mp4!")

if __name__ == '__main__':
    main()
