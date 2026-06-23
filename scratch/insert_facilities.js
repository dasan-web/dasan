const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        process.env[key] = value;
      }
    }
  });
}

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ektks0518!',
    database: process.env.DB_DATABASE || 'dasan_homepage'
  });

  try {
    const facContent = `다산제약은 고난도 제형 연구를 선도하는 수원 R&D 중앙연구소와 선진 GMP(KGMP) 규격에 부합하는 아산 제1, 2공장을 가동하여 연구개발에서 생산에 이르는 완성도 높은 제약 솔루션을 제공합니다.
수원 중앙연구소
경기 수원시 영통구 신원로 304(원천동) 이노플렉스 3동 306호
약물전달시스템(DDS) 플랫폼 설계, 복합 개량신약 제제 연구, 원료의약품(API) 고효율 합성 공정 개발
고해상도 분광광도계, 초고성능 액체크로마토그래피(UPLC), 나노 입자 입도분석기 등 최첨단 제제 분석 설비 보유
아산 제1공장
충청남도 아산시 도고면 덕암산로 342
완제의약품 (정제, 캡슐제, 유동층 과립제품 등)
독일 Glatt社 최첨단 유동층 코팅기 (GPCG-300, GPCG-120), 초고속 이중정 타정기, 중앙 자동화 컨트롤 모니터링 시스템
연간 최대 9억 정 규모 고형제 생산 라인
아산 제2공장
충청남도 아산시 도고면 덕암산로 381
의약품 포장 공정 자동화 및 스마트 물류창고
독일 및 이탈리아산 고속 블리스터(Alu-Alu, PVC/PVDC) 포장기, 카토너 카운터 일원화 라인, 실시간 온습도 조절 항온물류창고
정제 선별 고해상도 인쇄 선별 장치, 고성능 스마트 집진 시스템`;

    console.log('Inserting/updating facilities entry in admin_contents...');
    await connection.query(
      `INSERT INTO admin_contents (page_key, page_title, content)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      ['about/facilities', '공장 및 연구소', facContent]
    );
    console.log('Successfully completed!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

run();
