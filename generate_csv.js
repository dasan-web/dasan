const fs = require('fs');
const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'ektks0518!', database: 'dasan_homepage' });
  const [rows] = await pool.query("SELECT id, name FROM products WHERE english_name IS NULL OR english_name = ''");
  
  let csv = 'id,name,english_name\n';
  rows.forEach(r => {
    csv += `${r.id},${r.name},\n`;
  });
  
  fs.writeFileSync('C:/Users/송주섭-PC/.gemini/antigravity/brain/928294be-f547-4dd3-8c66-a3a54aa34bb9/missing_english_names.csv', csv);
  console.log('CSV created.');
  pool.end();
}

run().catch(console.error);
