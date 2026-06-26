const fs = require('fs');
const mysql = require('mysql2/promise');

// Parse .env.local
const envContent = fs.readFileSync('c:/Share/DASAN/.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

async function main() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const [rows] = await connection.execute(
      'SELECT content FROM admin_contents WHERE page_key = ?',
      ['about/ir/financial']
    );
    console.log('Current DB Content for about/ir/financial:');
    if (rows.length === 0) {
      console.log('No content found.');
    } else {
      console.log(rows[0].content);
      console.log('---');
      console.log(`Number of lines: ${rows[0].content.split('\n').length}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await connection.end();
  }
}

main();
