const mysql = require('mysql2/promise');

async function updateDb() {
  const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ektks0518!',
    database: 'dasan_homepage'
  });

  const [rows] = await pool.execute('SELECT page_key, content FROM admin_contents WHERE page_key LIKE "%about/ir/financial%"');
  console.log('Current DB content:', rows);

  for (const row of rows) {
    let content = row.content;
    const lines = content.split('\n');
    console.log(row.page_key, 'has', lines.length, 'lines');
  }

  pool.end();
}
updateDb();
