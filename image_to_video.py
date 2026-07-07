import cv2
import numpy as np
import math
import random
import os

def create_cinematic_video(image_path, out_filename):
    img = cv2.imread(image_path)
    if img is None:
        print(f"이미지를 찾을 수 없습니다: {image_path}")
        return

    fps = 30
    duration = 10  # 10초 길이
    total_frames = fps * duration
    height, width = img.shape[:2]
    
    # 출력 해상도는 1920x1080 (비율 유지 크롭)
    out_w, out_h = 1920, 1080
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(out_filename, fourcc, fps, (out_w, out_h))

    # 화면 비율에 맞춰 크롭 후 리사이즈
    img_aspect = width / height
    out_aspect = out_w / out_h
    if img_aspect > out_aspect:
        new_w = int(height * out_aspect)
        start_x = (width - new_w) // 2
        img = img[:, start_x:start_x+new_w]
    else:
        new_h = int(width / out_aspect)
        start_y = (height - new_h) // 2
        img = img[start_y:start_y+new_h, :]

    img = cv2.resize(img, (out_w, out_h), interpolation=cv2.INTER_CUBIC)

    # 파티클 (화면을 떠다니는 빛무리와 먼지) 초기화
    num_particles = 150
    particles = []
    for _ in range(num_particles):
        x = random.uniform(0, out_w)
        y = random.uniform(0, out_h)
        speed_x = random.uniform(-1, 1)
        speed_y = random.uniform(-2, -0.5)
        size = random.uniform(2, 10)
        alpha_phase = random.uniform(0, math.pi * 2)
        particles.append([x, y, speed_x, speed_y, size, alpha_phase])

    print(f"사진 기반 시네마틱 영상 렌더링 시작... ({image_path})")

    for frame_idx in range(total_frames):
        t = frame_idx / total_frames
        
        # 1. 켄 번즈(Ken Burns) 효과: 천천히 줌 인 및 패닝
        zoom = 1.0 + t * 0.15 # 1.0배에서 1.15배로 확대
        
        cx, cy = out_w / 2, out_h / 2
        pan_x = t * 40 # 우측으로 이동
        pan_y = t * 20 # 아래로 이동
        
        M = np.float32([
            [zoom, 0, cx - cx * zoom - pan_x],
            [0, zoom, cy - cy * zoom - pan_y]
        ])
        
        # 원본 이미지 변형
        frame = cv2.warpAffine(img, M, (out_w, out_h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0))
        
        # 2. 파티클(빛무리) 오버레이 생성
        overlay = np.zeros_like(frame)
        for p in particles:
            p[0] += p[2]
            p[1] += p[3]
            
            # 위로 올라가서 벗어나면 다시 아래에서 생성
            if p[1] < -10:
                p[1] = out_h + 10
                p[0] = random.uniform(0, out_w)
                
            p[5] += 0.05
            # 반짝거림 효과 (Opacity)
            opacity = (math.sin(p[5]) + 1) / 2
            
            r = int(p[4])
            color = (255, 255, 255) # 하얀 빛
            
            # 부드러운 원 그리기
            cv2.circle(overlay, (int(p[0]), int(p[1])), r, color, -1)
            
        # 파티클에 글로우(빛 번짐) 효과 적용
        overlay_blur = cv2.GaussianBlur(overlay, (15, 15), 0)
        
        # 원본 프레임과 자연스럽게 합성
        frame = cv2.addWeighted(frame, 1.0, overlay_blur, 0.4, 0)
        
        out.write(frame)
        
        if (frame_idx + 1) % 30 == 0:
            print(f"진행률: {frame_idx + 1}/{total_frames} 프레임...")

    out.release()
    print(f"완료! '{out_filename}' 생성됨.")

if __name__ == '__main__':
    # 업로드된 이미지와 유사할 것으로 예상되는 기존 프로젝트 내 이미지를 타겟으로 잡습니다.
    # 만약 다른 이미지를 원하신다면 경로를 수정할 수 있습니다.
    target_img = r"c:\Share\DASAN\public\dna_hero_bg.png"
    if not os.path.exists(target_img):
        print(f"이미지가 없습니다: {target_img}")
        print("스크립트와 같은 경로의 input.png를 사용 시도합니다.")
        target_img = "input.png"
        
    create_cinematic_video(target_img, "2026-07-06-photo-video.mp4")
