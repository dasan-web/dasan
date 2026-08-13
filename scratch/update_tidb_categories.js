const { query } = require('../src/lib/db');

async function main() {
  try {
    const categories = ['바이오신약', '합성신약', '제네릭'];
    const payload = JSON.stringify({ categories });

    const sql = `
      INSERT INTO admin_contents (page_key, page_title, content)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE content = VALUES(content)
    `;

    await query(sql, ['pipeline/categories', '파이프라인 분류 설정', payload]);
    console.log('SUCCESSFULLY_UPDATED_TIDB_CATEGORIES:', categories);

    const check = await query('SELECT * FROM admin_contents WHERE page_key = ?', ['pipeline/categories']);
    console.log('CHECK_TIDB_RESULT:', check);
    process.exit(0);
  } catch (err) {
    console.error('ERROR_UPDATING_TIDB:', err);
    process.exit(1);
  }
}

main();
