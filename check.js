const mysql = require('mysql2/promise');
async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'ektks0518!', database: 'dasan_homepage' });
  const [rows] = await pool.query('SELECT id, name, english_name FROM products WHERE name LIKE "%트윈맥스%"');
  console.log(rows);
  pool.end();
}
run();
