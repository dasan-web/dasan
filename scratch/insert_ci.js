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
    const ciContent = `다산제약의 CI는 독자적인 연구 플랫폼과 신약 파이프라인 개발을 향한 끝없는 도전, 그리고 인류의 건강을 최우선으로 생각하는 핵심 이념을 시각적으로 형상화하고 있습니다.
다산제약의 심볼은 과학과 생명의 조화로운 결합을 나타냅니다. 육각형 구조는 신약 개발 및 연구의 정밀한 화학적 결합과 견고한 기술력을 의미하며, 내부에 배치된 초록 나뭇잎은 인류의 생명 건강 증진과 친환경 미래 생명공학 리더로 성장하겠다는 비전을 상징합니다.
DASAN GREEN
RGB: 116, 184, 22 | HEX: #74B816
#74B816
생명력, 인류의 건강, 지속가능한 경영 가치 상징
DASAN CHARCOAL
RGB: 43, 43, 43 | HEX: #2B2B2B
#2B2B2B
기술적인 전문성, 정직한 기업 경영과 신뢰성 상징`;

    console.log('Inserting/updating CI entry in admin_contents...');
    await connection.query(
      `INSERT INTO admin_contents (page_key, page_title, content)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content)`,
      ['about/ci', 'CI', ciContent]
    );
    console.log('Successfully completed!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.end();
  }
}

run();
