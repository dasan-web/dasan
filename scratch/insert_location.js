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
    const locContent = `서울 본사
경영총괄, 해외 영업본부, 마케팅 전략부서
37.5186,126.8906
다산제약 서울 본사
서울특별시 영등포구 선유로 70 우리벤처타운 II 1302호
02-2627-5300
2호선 문래역 3번 출구 도보 8분|2/5호선 영등포구청역 6번 출구 도보 10분
우리벤처타운 정류장 하차|지선 6625, 6640A번 / 마을 영등포05번
수원 중앙연구소
DDS 제제 연구, 유기합성 연구
37.266205,127.054366
다산제약 수원 중앙연구소
경기 수원시 영통구 신원로 304 (원천동) 이노플렉스 3동 306호
031-546-8200
수인분당선 영통역 또는 청명역 하차 후 시내버스 환승 이용|수인분당선 망포역 4번 출구 도보 15분 (또는 버스 환승)
이노플렉스 정류장 하차|일반 62-1, 82-1, 99번 / 마을 55번
아산 제1공장
완제의약품 생산본부
36.7589,126.8687
다산제약 아산 제1공장
충청남도 아산시 도고면 덕암산로 342 (와산리 10번지)
041-543-5311
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용
아산 제2공장
최첨단 스마트 패키징 & 대량생산 라인
36.7621,126.8698
다산제약 아산 제2공장
충청남도 아산시 도고면 덕암산로 381 (와산리 30번지)
041-428-9484
1호선 신창역(순천향대) 하차 후 택시 이동 (약 10분)|도고온천역(장항선) 하차 후 택시 이용
와산1리 정류장 하차 후 도보 2분|아산 시내버스 400번대 노선 이용`;

    console.log('Inserting/updating location entry in admin_contents...');
    await connection.query(
      `INSERT INTO admin_contents (page_key, page_title, content)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      ['about/location', '찾아오시는 길', locContent]
    );
    console.log('Successfully completed!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

run();
