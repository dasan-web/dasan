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
    let content = rows[0].content;
    
    // Remove the HTML signature we added
    let newContent = content.replace(/\n\n<div style=\"text-align: right; margin-top: 4rem; display: flex; justify-content: flex-end; align-items: flex-end; gap: 1rem;\">[\s\S]*?<\/div>/, '');
    
    await connection.execute("UPDATE admin_contents SET content = ? WHERE page_key = 'about/intro'", [newContent]);
    console.log('Successfully reverted the database content.');
  }
  
  await connection.end();
}
run().catch(console.error);
