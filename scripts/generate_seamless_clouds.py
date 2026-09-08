import cv2
import numpy as np
import subprocess
import os

def main():
    print("Loading assets for upgraded bright sky & slow seamless clouds...")
    main_img = cv2.imread('public/main.png') # (1536, 2760, 3)
    sky_img = cv2.imread('scripts/sky_clouds_bright.jpg') # (768, 1376, 3)
    feathered_mask = np.load('perfect_lake_mask.npy') # (1536, 2760), float32 in [0, 1]

    h_main, w_main = main_img.shape[:2]
    h_sky, w_sky = sky_img.shape[:2]

    # Lake bounding box in perfect_lake_mask
    y_idx, x_idx = np.where(feathered_mask > 0.01)
    x0, x1 = x_idx.min(), x_idx.max()
    y0, y1 = y_idx.min(), y_idx.max()
    w_lake = x1 - x0
    h_lake = y1 - y0
    print(f"Lake bbox: x=[{x0}, {x1}] (w={w_lake}), y=[{y0}, {y1}] (h={h_lake})")

    # 1. Create horizontally seamless sky panorama
    # We want a period P of 540 px for a very slow, calm drift
    S = 240 # Seam blending width
    P = 540 # Periodic width
    source_w = P + S # 780 px

    sky_sub = sky_img[:, :source_w].astype(np.float32)

    left = sky_sub[:, :S]
    right = sky_sub[:, -S:]
    t = np.linspace(0, np.pi, S).reshape(1, S, 1)
    alpha_seam = (1.0 - np.cos(t)) / 2.0

    blended_seam = (1.0 - alpha_seam) * right + alpha_seam * left
    periodic_sky = np.zeros((h_sky, P, 3), dtype=np.float32)
    periodic_sky[:, :S] = blended_seam
    periodic_sky[:, S:] = sky_sub[:, S:P]

    # Tile 3 times for easy continuous sampling without boundary issues
    sky_extended = np.hstack([periodic_sky, periodic_sky, periodic_sky])

    # Zoom in on sky for BIGGER fluffy cumulus clouds:
    sky_win_h = 310 # Zoomed in height (previously 420, so clouds are ~35% larger!)
    sky_win_w = int(sky_win_h * (w_lake / h_lake))
    sky_y_start = (h_sky - sky_win_h) // 2

    # Animation parameters:
    # 24 seconds, 30 fps = 720 frames
    fps = 30
    duration = 24
    total_frames = fps * duration

    # Speed: Exactly 1 period P (540 px) across 720 frames
    # Drift = 540 / 720 = 0.75 px per frame = 22.5 px per second (peaceful, slow drift)
    # Clouds flow from LEFT to RIGHT:
    # sample_x_offset = P + (P - (frame / total_frames) * P)

    # Lake coordinates grid for remap
    grid_y, grid_x = np.mgrid[0:h_lake, 0:w_lake]

    # Pre-extract patch alpha
    alpha_3d = np.repeat(feathered_mask[y0:y1, x0:x1, np.newaxis], 3, axis=2)

    out_raw_file = 'temp_clouds_bright_raw.mp4'
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(out_raw_file, fourcc, fps, (w_main, h_main))

    print(f"Rendering {total_frames} frames ({duration}s at {fps}fps, very slow & big clouds)...")

    for frame_idx in range(total_frames):
        tau = frame_idx / total_frames

        # Exact periodic drift from left to right
        drift_px = (tau * P) % P
        sample_x_base = P + (P - drift_px)

        # Subtle periodic harmonic water ripples (integer cycles so loop is 100% seamless)
        phase3 = 2.0 * np.pi * 3 * tau
        phase5 = 2.0 * np.pi * 5 * tau

        ripple_dx = 1.2 * np.sin(2.0 * np.pi * grid_y / 36.0 + phase3) + 0.6 * np.sin(2.0 * np.pi * grid_y / 18.0 - phase5)
        ripple_dy = 0.8 * np.cos(2.0 * np.pi * grid_x / 42.0 + phase3) + 0.4 * np.cos(2.0 * np.pi * grid_x / 22.0 - phase5)

        # Coordinate mapping for remap
        map_x = sample_x_base + (grid_x / w_lake) * sky_win_w + ripple_dx * (sky_win_w / w_lake)
        map_y = sky_y_start + (grid_y / h_lake) * sky_win_h + ripple_dy * (sky_win_h / h_lake)

        map_x = map_x.astype(np.float32)
        map_y = np.clip(map_y, 0, h_sky - 1).astype(np.float32)

        # Sample sky reflection
        water_sky = cv2.remap(sky_extended, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

        # Full replacement with bright sky (no murky grey tint)
        frame = main_img.copy()
        lake_patch = frame[y0:y1, x0:x1].astype(np.float32)

        blended_patch = lake_patch * (1.0 - alpha_3d) + water_sky * alpha_3d
        frame[y0:y1, x0:x1] = np.clip(blended_patch, 0, 255).astype(np.uint8)

        writer.write(frame)

        if (frame_idx + 1) % 90 == 0:
            print(f"Rendered {frame_idx + 1}/{total_frames} frames ({((frame_idx + 1)/total_frames)*100:.0f}%)...")

    writer.release()
    print("Raw render complete. Verifying seamless loop seam between frame 0 and last frame...")

    cap = cv2.VideoCapture(out_raw_file)
    ret, f0 = cap.read()
    cap.set(cv2.CAP_PROP_POS_FRAMES, total_frames - 1)
    ret, f_last = cap.read()
    cap.release()

    diff_seam = cv2.absdiff(f0, f_last)
    lake_diff = diff_seam[y0:y1, x0:x1]
    print(f"Loop seam diff in lake: max={lake_diff.max()}, mean={lake_diff.mean():.4f}")

    # Compress to web-optimized H.264 MP4 with ffmpeg
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
    print("SUCCESS! Generated updated 24s bright slow clouds loop in public/main_clouds.mp4!")

if __name__ == '__main__':
    main()
