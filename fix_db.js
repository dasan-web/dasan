const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const envText = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });

  const pool = mysql.createPool({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || '3306'),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    console.log('Altering table...');
    try {
      await pool.query('ALTER TABLE products ADD COLUMN updated_by VARCHAR(100) DEFAULT NULL, ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
      console.log('Added updated_by and updated_at columns.');
    } catch(e) {
      console.log('Alter table error (might already exist):', e.message);
    }

    const updates = [
      { name: "트윈맥스 정", engName: "Twinmax Tab." },
      { name: "디스포지 정", engName: "Disforge Tab." },
      { name: "클라그렐 정", engName: "Clagrel Tab." },
      { name: "안티그라 정", engName: "Antigra Tab." },
      { name: "안티그라 서방정", engName: "Antigra ER Tab." },
      { name: "뉴마프로 정", engName: "Newmapro Tab." },
      { name: "뉴스피린 장용정", engName: "Newspirin Enteric-coated Tab." },
      { name: "아로노핀 정", engName: "Aronopin Tab." },
      { name: "세베텐션 정", engName: "Sevetension Tab." },
      { name: "뉴로잘탄 정", engName: "Neurozartan Tab." },
      { name: "프리텐션 정", engName: "Pretension Tab." },
      { name: "프리텐션플러스 정", engName: "Pretension Plus Tab." },
      { name: "올메르탄플러스 정", engName: "Olmertan Plus Tab." },
      { name: "뉴로잘탄플러스 정", engName: "Neurozartan Plus Tab." },
      { name: "카딜론 정", engName: "Cardilon Tab." },
      { name: "크레스우 정", engName: "Creswoo Tab." },
      { name: "리두스타 정", engName: "Ridustar Tab." },
      { name: "바이토젯 정", engName: "Vytozet Tab." },
      { name: "소코토젯 정", engName: "Socotozet Tab." },
      { name: "자누글립 정", engName: "Januglip Tab." },
      { name: "자누메트 정", engName: "Janumet Tab." },
      { name: "자누다파 정", engName: "Janudapa Tab." },
      { name: "액토스타 정", engName: "Actostar Tab." },
      { name: "글리메피드 정", engName: "Glimepiride Tab." },
      { name: "치옥타시드HR 정", engName: "Thioctacid HR Tab." },
      { name: "프라카스 정", engName: "Pracas Tab." },
      { name: "에르도스 캡슐", engName: "Erdos Cap." },
      { name: "알레스틴 정", engName: "Alestin Tab." },
      { name: "뮤코스테인 정", engName: "Mucostein Tab." },
      { name: "펠라움 정", engName: "Pelaum Tab." },
      { name: "레보드로프 정", engName: "Levodrop Tab." },
      { name: "세티진 정", engName: "Cetirizine Tab." },
      { name: "알레진 정", engName: "Allezin Tab." },
      { name: "디에스틸 정", engName: "Diestil Tab." },
      { name: "넥시아젠 정", engName: "Nexiazen Tab." },
      { name: "넥시아엠디 정", engName: "Nexia MD Tab." },
      { name: "파라베 정", engName: "Parabe Tab." },
      { name: "모사프리 정", engName: "Mosapri Tab." },
      { name: "레바소론 정", engName: "Rebasoron Tab." },
      { name: "파모티딘 정", engName: "Famotidine Tab." },
      { name: "알마겔 정", engName: "Almagel Tab." },
      { name: "탐스로신 서방정", engName: "Tamsulosin ER Tab." },
      { name: "테라조신 정", engName: "Terazosin Tab." },
      { name: "올메네신 정", engName: "Olmenesin Tab." },
      { name: "프로베린 정", engName: "Proberin Tab." },
      { name: "미라베그론 서방정", engName: "Mirabegron ER Tab." },
      { name: "두타스테리드 캡슐", engName: "Dutasteride Cap." },
      { name: "글리아린 연질캡슐", engName: "Gliarin Soft Cap." },
      { name: "디멘도네 정", engName: "Dimendone Tab." },
      { name: "메만틴 정", engName: "Memantine Tab." },
      { name: "디멘콜린 정", engName: "Dimencoline Tab." },
      { name: "세로세틴 캡슐", engName: "Serocetin Cap." },
      { name: "쿠에티핀 정", engName: "Quetiapine Tab." },
      { name: "가바티폰 캡슐", engName: "Gabatipon Cap." },
      { name: "프레가바 캡슐", engName: "Pregaba Cap." },
      { name: "에스클러 캡슐", engName: "Esclor Cap." },
      { name: "픽시마 캡슐", engName: "Pixima Cap." },
      { name: "클라리신 정", engName: "Clarithromycin Tab." },
      { name: "하이레보 정", engName: "Hirevo Tab." },
      { name: "아시버 정", engName: "Aciver Tab." },
      { name: "라미실 정", engName: "Lamisil Tab." },
      { name: "디플루칸 캡슐", engName: "Diflucan Cap." },
      { name: "레일라 정", engName: "Layla Tab." },
      { name: "세클로페 정", engName: "Seclope Tab." },
      { name: "멜록시캠 캡슐", engName: "Meloxicam Cap." },
      { name: "록소드린 정", engName: "Loxodrin Tab." },
      { name: "덱시부프로펜 정", engName: "Dexibuprofen Tab." },
      { name: "굿트라셋 정", engName: "Goodtracet Tab." },
      { name: "굿트라셋세미 정", engName: "Goodtracet Semi Tab." },
      { name: "세레콕스 캡슐", engName: "Celecox Cap." }
    ];

    console.log('Updating names...');
    for (const item of updates) {
      await pool.query('UPDATE products SET english_name = ?, updated_by = ? WHERE name = ?', [item.engName, 'AI Assistant', item.name]);
    }
    console.log('All 70 products updated successfully on remote DB.');

  } catch(err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
