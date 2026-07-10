const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ektks0518!',
    database: 'dasan_homepage'
  });
  
  const [rows] = await connection.execute("SELECT * FROM admin_contents WHERE content LIKE '%柳亭善%'");
  console.log('Found:', rows.length);
  
  if (rows.length > 0) {
    for (const row of rows) {
      const newContent = row.content.replace(/柳亭善/g, '류형선');
      await connection.execute("UPDATE admin_contents SET content = ? WHERE page_key = ?", [newContent, row.page_key]);
      console.log('Updated:', row.page_key);
    }
  } else {
    console.log('No content found matching the Chinese name.');
  }
  
  await connection.end();
}
run().catch(console.error);
