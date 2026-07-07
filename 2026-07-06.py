import cv2
import numpy as np
import math

# 고화질 3D 구체(원자) 스프라이트 생성 함수
def create_sphere_sprite(size, base_color):
    sprite = np.zeros((size, size, 3), dtype=np.float32)
    alpha = np.zeros((size, size), dtype=np.float32)
    r = size / 2.0
    cx, cy = r, r
    
    # 조명 방향 (위쪽 약간 왼쪽에서 오는 빛)
    lx, ly, lz = -0.6, -0.6, 1.0
    llen = math.sqrt(lx*lx + ly*ly + lz*lz)
    lx, ly, lz = lx/llen, ly/llen, lz/llen

    for y in range(size):
        for x in range(size):
            dx = x - cx + 0.5
            dy = y - cy + 0.5
            dist = math.hypot(dx, dy)
            if dist <= r:
                # 3D 법선 벡터 (Normal)
                nz = math.sqrt(max(0, r*r - dist*dist)) / r
                nx = dx / r
                ny = dy / r
                
                # 퐁 셰이딩 (Phong Shading)
                dot = nx*lx + ny*ly + nz*lz
                diffuse = max(0, dot)
                ambient = 0.3
                specular = math.pow(max(0, dot), 15) * 1.0
                
                intensity = ambient + diffuse * 0.7
                color = np.array(base_color) * intensity + np.array([255, 255, 255]) * specular
                
                sprite[y, x] = np.clip(color, 0, 255)
                alpha[y, x] = np.clip(r - dist + 0.5, 0, 1) # 안티앨리어싱
                
    return sprite, alpha

# 여러 개의 원자가 결합된 고화질 '분자(Molecule)' 스프라이트 생성
def create_molecule_sprite(size):
    sprite = np.zeros((size, size, 3), dtype=np.float32)
    alpha = np.zeros((size, size), dtype=np.float32)
    
    # 중앙 원자 (밝은 연녹색)
    r_main = int(size * 0.4)
    s_main, a_main = create_sphere_sprite(r_main, [204, 255, 204]) # BGR
    
    # 보조 원자 (네온 그린)
    r_sub = int(size * 0.25)
    s_sub, a_sub = create_sphere_sprite(r_sub, [65, 255, 0])
    
    def blend_sprite(target_s, target_a, src_s, src_a, px, py):
        h, w = src_s.shape[:2]
        for y in range(h):
            for x in range(w):
                tx, ty = px + x, py + y
                if 0 <= tx < size and 0 <= ty < size:
                    src_alpha = src_a[y, x]
                    if src_alpha > 0:
                        inv_alpha = 1.0 - src_alpha
                        target_s[ty, tx] = target_s[ty, tx] * inv_alpha + src_s[y, x] * src_alpha
                        target_a[ty, tx] = max(target_a[ty, tx], src_alpha)
    
    center = size // 2
    # 보조 원자 배치 (120도 간격)
    for angle in [0, 120, 240]:
        rad = math.radians(angle)
        offset_x = int(math.cos(rad) * (size * 0.25))
        offset_y = int(math.sin(rad) * (size * 0.25))
        px = center + offset_x - r_sub // 2
        py = center + offset_y - r_sub // 2
        blend_sprite(sprite, alpha, s_sub, a_sub, px, py)
        
    # 중앙 원자를 맨 위에 덮어쓰기
    px_main = center - r_main // 2
    py_main = center - r_main // 2
    blend_sprite(sprite, alpha, s_main, a_main, px_main, py_main)
    
    return sprite, alpha

def create_animation():
    fps = 30
    duration = 15
    total_frames = fps * duration
    width, height = 1920, 1080
    cx, cy = width // 2, height // 2

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out_filename = '2026-07-06.mp4'
    out = cv2.VideoWriter(out_filename, fourcc, fps, (width, height))

    print("초고화질 분자 4D 육각형 렌더링 시작... (총 450 프레임)")

    # 해상도 높은 분자 스프라이트를 여러 크기별로 캐싱
    print("고해상도 분자 텍스처 렌더링 중...")
    mol_sprites = {}
    for s in range(10, 80, 2):
        mol_sprites[s] = create_molecule_sprite(s)

    R = 60 # 간격 약간 넓힘
    RINGS = 8
    
    vertex_set = set()
    for q in range(-RINGS, RINGS + 1):
        for r in range(-RINGS, RINGS + 1):
            if abs(q + r) <= RINGS:
                cx_hex = R * math.sqrt(3) * (r + q / 2)
                cy_hex = R * 1.5 * q
                for i in range(6):
                    a1 = i * math.pi / 3 + math.pi / 6
                    vx = cx_hex + R * math.cos(a1)
                    vy = cy_hex + R * math.sin(a1)
                    vertex_set.add((round(vx, 1), round(vy, 1)))
                    
    nodes_2d = list(vertex_set)
    nodes_3d = [[nx, 0, ny] for nx, ny in nodes_2d]
    num_nodes = len(nodes_3d)

    edges = []
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            dx = nodes_3d[i][0] - nodes_3d[j][0]
            dz = nodes_3d[i][2] - nodes_3d[j][2]
            dist = math.sqrt(dx*dx + dz*dz)
            if abs(dist - R) < 5.0:
                mid_x = (nodes_3d[i][0] + nodes_3d[j][0]) / 2
                mid_z = (nodes_3d[i][2] + nodes_3d[j][2]) / 2
                edges.append((i, j, math.sqrt(mid_x**2 + mid_z**2)))
                
    edges.sort(key=lambda e: e[2])
    total_edges = len(edges)

    for frame_idx in range(total_frames):
        t = frame_idx / total_frames
        
        pitch = math.radians(65 - t * 15)
        yaw = t * math.pi * 2 * 0.4
        
        cos_p, sin_p = math.cos(pitch), math.sin(pitch)
        cos_y, sin_y = math.cos(yaw), math.sin(yaw)

        projected = []
        for i in range(num_nodes):
            nx, ny, nz = nodes_3d[i]
            
            dist_from_center = math.sqrt(nx*nx + nz*nz)
            ny += math.sin(t * math.pi * 6 - dist_from_center / 80) * 15 # 상하 폭 증가

            x1 = nx * cos_y - nz * sin_y
            z1 = nx * sin_y + nz * cos_y
            y1 = ny
            
            y2 = y1 * cos_p - z1 * sin_p
            z2 = y1 * sin_p + z1 * cos_p
            x2 = x1

            fov = 1000
            z_cam = z2 + 800 + t * 400
            
            if z_cam > 10:
                f = fov / z_cam
                px = int(x2 * f + cx)
                py = int(y2 * f + cy)
                projected.append((px, py, z_cam, True, i))
            else:
                projected.append((0, 0, 0, False, i))
                
        projected.sort(key=lambda p: p[2], reverse=True)
        proj_map = {p[4]: p for p in projected}

        draw_limit = int((t * 2.0) * total_edges)
        draw_limit = min(draw_limit, total_edges)
        
        lines_canvas = np.zeros((height, width, 3), dtype=np.float32)
        drawn_nodes = set()
        
        for e_idx in range(draw_limit):
            u, v = edges[e_idx][0], edges[e_idx][1]
            p_u, p_v = proj_map[u], proj_map[v]
            
            if p_u[3] and p_v[3]:
                z_avg = (p_u[2] + p_v[2]) / 2
                depth_factor = max(0, min(1, 1200 / (z_avg + 300)))
                
                b, g, r_color = 65 * depth_factor, 255 * depth_factor, 0
                thickness = max(1, int(4 * depth_factor))
                cv2.line(lines_canvas, (p_u[0], p_u[1]), (p_v[0], p_v[1]), (b, g, r_color), thickness, cv2.LINE_AA)
                
                drawn_nodes.add(u)
                drawn_nodes.add(v)
                
        nodes_canvas = np.zeros((height, width, 3), dtype=np.float32)
        
        # 고화질 분자 이미지 합성
        for p in projected:
            if not p[3]: continue
            u = p[4]
            if u not in drawn_nodes: continue
            
            depth_factor = max(0, min(1, 1200 / (p[2] + 300)))
            size = max(10, int(60 * depth_factor)) # 더 크고 선명하게
            if size % 2 != 0: size += 1
            if size >= 80: size = 78
            
            sprite, alpha = mol_sprites[size]
            
            px, py = p[0] - size//2, p[1] - size//2
            
            # 빠른 화면 합성 (알파 블렌딩)
            x1, y1 = max(0, px), max(0, py)
            x2, y2 = min(width, px + size), min(height, py + size)
            
            if x2 > x1 and y2 > y1:
                sx1, sy1 = x1 - px, y1 - py
                sx2, sy2 = sx1 + (x2 - x1), sy1 + (y2 - y1)
                
                target_region = nodes_canvas[y1:y2, x1:x2]
                src_sprite = sprite[sy1:sy2, sx1:sx2]
                src_alpha = alpha[sy1:sy2, sx1:sx2, np.newaxis]
                
                nodes_canvas[y1:y2, x1:x2] = target_region * (1 - src_alpha) + src_sprite * src_alpha

        combined = lines_canvas + nodes_canvas
        
        glow1 = cv2.GaussianBlur(combined, (15, 15), 0)
        glow2 = cv2.GaussianBlur(combined, (31, 31), 0)
        
        final_frame = combined * 0.9 + glow1 * 0.7 + glow2 * 0.4
        final_frame = np.clip(final_frame, 0, 255).astype(np.uint8)
        
        bg = np.full((height, width, 3), (15, 20, 15), dtype=np.uint8) 
        final_frame = cv2.addWeighted(bg, 1.0, final_frame, 1.0, 0)
        
        out.write(final_frame)
        
        if (frame_idx + 1) % 30 == 0:
            print(f"렌더링 진행률: {frame_idx + 1}/{total_frames} 프레임 완료...")

    out.release()
    print(f"\n완료되었습니다! '{out_filename}' 파일이 고화질 분자 버전으로 저장되었습니다.")

if __name__ == '__main__':
    create_animation()
