const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const envText = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  envText.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });

  const pool = mysql.createPool({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || '3306'),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    console.log('Updating product name...');
    // We will update the name and the english_name
    await pool.query('UPDATE products SET name = ?, english_name = ?, updated_by = ? WHERE name = ?', ['트윈엑트 정', 'Twinect Tab.', 'AI Assistant', '트윈맥스 정']);
    console.log('Successfully updated 트윈맥스 정 to 트윈엑트 정 (Twinect Tab.).');

  } catch(err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
