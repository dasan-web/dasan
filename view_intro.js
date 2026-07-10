const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ektks0518!',
    database: 'dasan_homepage'
  });
  
  const [rows] = await connection.execute("SELECT content FROM admin_contents WHERE page_key='about/intro'");
  if (rows.length > 0) {
    console.log(rows[0].content);
  } else {
    console.log('No content found.');
  }
  
  await connection.end();
}
run().catch(console.error);
