const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '34mGcDTA8bbMoj7.root',
  password: '3h8a12Y8gOr6fbVj',
  database: 'dasan_homepage',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const [rows] = await pool.execute('SELECT content FROM admin_contents WHERE page_key = "about/location"');
  if (rows.length > 0) {
    const lines = rows[0].content.split('\n');
    console.log("Lines count:", lines.length);
    console.log("Lines list:");
    lines.forEach((line, idx) => console.log(`${idx}: ${line}`));
  } else {
    console.log("No record found!");
  }
  await pool.end();
}

run().catch(console.error);
