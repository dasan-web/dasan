const mysql = require('mysql2/promise');
const xlsx = require('xlsx');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'ektks0518!',
  database: process.env.DB_DATABASE || 'dasan_homepage',
  ssl: { rejectUnauthorized: false },
};

// 초성 추출 함수
function getConsonant(str) {
  const CHO_SUNG = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  if (!str) return 'ㅇ';
  const charCode = str.charCodeAt(0) - 44032;
  if (charCode < 0 || charCode > 11171) return str.charAt(0);
  return CHO_SUNG[Math.floor(charCode / 588)];
}

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('DB 연결 성공');

    // 1. 컬럼 추가 (존재하지 않으면 무시되거나 에러를 잡아서 넘김)
    const columnsToAdd = [
      "category VARCHAR(100) DEFAULT NULL",
      "ingredient VARCHAR(200) DEFAULT NULL",
      "content VARCHAR(100) DEFAULT NULL",
      "reference_drug VARCHAR(100) DEFAULT NULL",
      "efficacy_detail TEXT DEFAULT NULL",
      "appearance VARCHAR(255) DEFAULT NULL",
      "ingredient_detail TEXT DEFAULT NULL",
      "usage_capacity TEXT DEFAULT NULL",
      "storage_method VARCHAR(255) DEFAULT NULL",
      "packaging_unit VARCHAR(255) DEFAULT NULL",
      "insurance_code VARCHAR(100) DEFAULT NULL",
      "insurance_price INT DEFAULT NULL",
      "precautions TEXT DEFAULT NULL"
    ];

    for (const colDef of columnsToAdd) {
      try {
        const colName = colDef.split(' ')[0];
        await connection.query(`ALTER TABLE products ADD COLUMN ${colDef}`);
        console.log(`컬럼 추가됨: ${colName}`);
      } catch (err) {
        if (err.code !== 'ER_DUP_FIELDNAME') {
          console.error(`컬럼 추가 에러 (${colDef}):`, err.message);
        }
      }
    }

    // type 컬럼 기본값 '전문의약품' 변경
    try {
      await connection.query(`ALTER TABLE products MODIFY COLUMN type VARCHAR(50) NOT NULL DEFAULT '전문의약품'`);
    } catch (e) {}

    // 2. 엑셀 파일 읽기
    const workbook = xlsx.readFile('C:/Share/DASAN/의약품_상세정보_모음집(데이터마이그레이션)_20260810.xlsx');
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(`총 ${data.length}건의 데이터를 읽었습니다.`);

    // 3. 데이터 순회하며 삽입 또는 업데이트
    let inserted = 0;
    let updated = 0;

    for (const row of data) {
      const name = row['제품명'];
      if (!name) continue;

      const category = row['계열'] || null;
      const ingredient = row['성분명'] || null;
      const content = row['함량'] || null;
      const reference_drug = row['대조약'] || null;
      const efficacy_detail = row['효능·효과'] || null;
      const appearance = row['성상'] || null;
      const ingredient_detail = row['성분/함량 상세'] || null;
      const usage_capacity = row['용법·용량'] || null;
      const storage_method = row['저장방법'] || null;
      const packaging_unit = row['포장단위'] || null;
      const insurance_code = row['보험코드'] ? String(row['보험코드']) : null;
      const insurance_price = row['보험약가(원)'] ? Number(row['보험약가(원)']) : null;
      const precautions = row['의약정보/주의사항'] || null;
      
      const efficacy = category || '기타'; // 기존 efficacy 필드 대응용
      const consonant = getConsonant(name);
      const type = '전문의약품';

      // 기존 레코드 존재 여부 확인
      const [rows] = await connection.query('SELECT id FROM products WHERE name = ?', [name]);

      if (rows.length > 0) {
        // UPDATE
        const updateQuery = `
          UPDATE products 
          SET 
            category = ?, ingredient = ?, content = ?, reference_drug = ?, 
            efficacy_detail = ?, appearance = ?, ingredient_detail = ?, 
            usage_capacity = ?, storage_method = ?, packaging_unit = ?, 
            insurance_code = ?, insurance_price = ?, precautions = ?
          WHERE name = ?
        `;
        await connection.query(updateQuery, [
          category, ingredient, content, reference_drug, efficacy_detail,
          appearance, ingredient_detail, usage_capacity, storage_method,
          packaging_unit, insurance_code, insurance_price, precautions,
          name
        ]);
        updated++;
      } else {
        // INSERT
        const insertQuery = `
          INSERT INTO products (
            name, type, efficacy, consonant, 
            category, ingredient, content, reference_drug, efficacy_detail, 
            appearance, ingredient_detail, usage_capacity, storage_method, 
            packaging_unit, insurance_code, insurance_price, precautions
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.query(insertQuery, [
          name, type, efficacy, consonant,
          category, ingredient, content, reference_drug, efficacy_detail,
          appearance, ingredient_detail, usage_capacity, storage_method,
          packaging_unit, insurance_code, insurance_price, precautions
        ]);
        inserted++;
      }
    }

    console.log(`마이그레이션 완료! (INSERT: ${inserted}건, UPDATE: ${updated}건)`);

  } catch (err) {
    console.error('마이그레이션 실패:', err);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrate();
