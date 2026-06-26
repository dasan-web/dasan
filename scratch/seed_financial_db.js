const fs = require('fs');
const mysql = require('mysql2/promise');

// Parse .env.local
const envContent = fs.readFileSync('c:/Share/DASAN/.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const defaultContent = `주주 중심 경영과 공정한 기업 가치 평가
다산제약의 경영 실적 및 투자 공시 자료는 관련 법령에 의거하여 명확하고 성실하게 공개되고 있습니다. 주주 및 투자자 여러분의 이해를 돕기 위해 실시간 재무 핵심 지표를 제공합니다.
2023년 (개별)|2024년 (개별)|2025년 (연결)
매출액|79,300|93,800|106,900
영업이익|2,400|6,200|1,400
R&D 투자액|9,500|12,000|13,500
유동자산|46,300|52,524|61,500
비유동자산|108,300|130,015|140,300
자산총계|154,600|182,539|201,800
유동부채|78,200|92,400|101,400
비유동부채|45,300|53,800|57,800
부채총계|123,500|146,200|159,200
자본금|10,000|10,000|10,000
자본잉여금|8,200|8,200|8,200
기타자본|-500|-500|-500
이익잉여금|13,100|18,339|24,600
비지배지분|300|300|300
자본총계|31,100|36,339|42,600
유동자산|44,500|50,200|59,200
비유동자산|106,700|128,200|139,300
자산총계|151,200|178,400|198,500
유동부채|76,800|89,500|99,400
비유동부채|43,600|52,860|56,800
부채총계|120,400|142,360|156,200
자본금|10,000|10,000|10,000
자본잉여금|8,200|8,200|8,200
기타자본|-500|-500|-500
이익잉여금|13,100|18,340|24,600
자본총계|30,800|36,040|42,300
매출액|79,300|93,800|106,900
영업이익|2,400|6,200|1,400
법인세차감전순이익|2,800|8,600|1,300
당기순이익|2,300|7,900|1,100
매출액|78,500|92,700|105,200
영업이익|2,300|6,100|1,300
법인세차감전순이익|2,700|8,400|1,200
당기순이익|2,200|7,700|1,000`;

async function main() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const [rows] = await connection.execute(
      'SELECT page_key FROM admin_contents WHERE page_key = ?',
      ['about/ir/financial']
    );
    if (rows.length === 0) {
      await connection.execute(
        'INSERT INTO admin_contents (page_key, page_title, content, is_hidden) VALUES (?, ?, ?, ?)',
        ['about/ir/financial', '재무정보', defaultContent, 0]
      );
      console.log('Successfully inserted default financial contents into database.');
    } else {
      console.log('Financial contents already exists in database, no action taken.');
    }
  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}

main();
