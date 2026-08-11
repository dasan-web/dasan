const mysql = require('mysql2/promise');
const fs = require('fs');
const xlsx = require('xlsx');

async function run() {
  // 1. Read .env.local
  const envText = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });

  // 2. Parse Excel
  const wb = xlsx.readFile('C:/Share/DASAN/Product Category_260728.xlsx');
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const productDosages = {};
  let currentProductName = null;

  data.forEach((row) => {
    const name = row['__EMPTY_2'];
    const dosage = row['__EMPTY_4'];
    
    if (name && name !== '제품명') {
      currentProductName = String(name).trim();
    }
    
    if (currentProductName && dosage && dosage !== '함량') {
      if (!productDosages[currentProductName]) {
        productDosages[currentProductName] = [];
      }
      const cleanDosage = String(dosage).trim();
      if (!productDosages[currentProductName].includes(cleanDosage)) {
        productDosages[currentProductName].push(cleanDosage);
      }
    }
  });

  // 3. Connect DB
  const pool = mysql.createPool({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || '3306'),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const [dbProducts] = await pool.query('SELECT id, name, content FROM products');
    console.log(`Found ${dbProducts.length} products in DB.`);

    let updatedCount = 0;

    for (const p of dbProducts) {
      const dbName = p.name.trim();
      
      // Match key in Excel
      let matchedKey = Object.keys(productDosages).find(k => k === dbName);
      
      // If direct match failed, try aliases / common variations
      if (!matchedKey) {
        if (dbName === '트윈엑트 정' || dbName === '트윈맥스 정') matchedKey = '트윈액트 정';
        else if (dbName === '클라그렐 정') matchedKey = '클피그렐 정';
        else if (dbName === '세베텐션 정') matchedKey = '세비텐션 정';
        else if (dbName === '뉴로잘탄 정') matchedKey = '뉴코잘탄 정';
        else if (dbName === '바이토젯 정') matchedKey = '브이토젯 정';
        else if (dbName === '소코토젯 정') matchedKey = '조코토린 정';
        else if (dbName === '자누메트 정') matchedKey = '자누믹스 정';
        else if (dbName === '자누다파 정') matchedKey = '자누프립 정';
        else if (dbName === '치옥타시드HR 정') matchedKey = '알파타시드HR 정';
        else if (dbName === '프라카스 정') matchedKey = '프리투스 정';
        else if (dbName === '에르도스 캡슐') matchedKey = '에르코프 캡슐';
        else if (dbName === '알레스틴 정') matchedKey = '다에피 정';
        else if (dbName === '뮤코스테인 정') matchedKey = '뮤코티아 캡슐';
        else if (dbName === '펠라움 정') matchedKey = '카니움 정';
        else if (dbName === '레보드로프 정') matchedKey = '레보푸 정';
        else if (dbName === '세티진 정') matchedKey = '세지날 정';
        else if (dbName === '알레진 정') matchedKey = '알레자이 정';
        else if (dbName === '디에스틸 정') matchedKey = '디에스틸렌 정';
        else if (dbName === '모사프리 정') matchedKey = '모사모픽 정';
        else if (dbName === '레바소론 정') matchedKey = '레바스코 정';
        else if (dbName === '파모티딘 정') matchedKey = '다산파모티딘 정';
        else if (dbName === '알마겔 정') matchedKey = '알마스콘 정';
        else if (dbName === '탐스로신 서방정') matchedKey = '탐스올 서방정';
        else if (dbName === '테라조신 정') matchedKey = '뉴라조신 정';
        else if (dbName === '올메네신 정') matchedKey = '올페나신 정';
        else if (dbName === '프로베린 정') matchedKey = '유프베린 정';
        else if (dbName === '미라베그론 서방정') matchedKey = '뉴타미가 서방정';
        else if (dbName === '두타스테리드 캡슐') matchedKey = '두타프렌 정';
        else if (dbName === '디멘콜린 정') matchedKey = '디멘콜린 정';
        else if (dbName === '디멘도네 정') matchedKey = '디멘도네 정';
        else if (dbName === '메만틴 정') matchedKey = '메만빅 정';
        else if (dbName === '가바티폰 캡슐') matchedKey = '가바티론 캡슐';
        else if (dbName === '프레가바 캡슐') matchedKey = '큐로리카 캡슐';
        else if (dbName === '클라리신 정') matchedKey = '리클래신 정';
        else if (dbName === '아시버 정') matchedKey = '하시버 정';
        else if (dbName === '라미실 정') matchedKey = '라미가드 정';
        else if (dbName === '디플루칸 캡슐') matchedKey = '디스플루 캡슐';
        else if (dbName === '레일라 정') matchedKey = '리얼리 정';
        else if (dbName === '세클로페 정') matchedKey = '세크로낙 정';
        else if (dbName === '멜록시캠 캡슐') matchedKey = '뉴록시캄 캡슐';
        else if (dbName === '록소드린 정') matchedKey = '록소디엘 정';
        else if (dbName === '덱시부프로펜 정') matchedKey = '다산덱시부프로펜 정';
        else if (dbName === '세레콕스 캡슐') matchedKey = '세레코브 캡슐';
      }

      if (matchedKey && productDosages[matchedKey]) {
        const combinedContent = productDosages[matchedKey].join(', ');
        console.log(`[UPDATE] ${dbName} (from Excel "${matchedKey}") -> "${combinedContent}"`);
        await pool.query('UPDATE products SET content = ?, updated_by = ? WHERE id = ?', [combinedContent, 'AI Assistant', p.id]);
        updatedCount++;
      } else {
        console.log(`[NO MATCH] DB product "${dbName}"`);
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} products with combined dosages!`);

  } catch(err) {
    console.error("DB error:", err);
  } finally {
    pool.end();
  }
}

run();
