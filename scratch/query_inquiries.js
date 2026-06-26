const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
let dbHost = 'localhost';
let dbPort = 3306;
let dbUser = 'root';
let dbPass = 'ektks0518!';
let dbName = 'dasan_homepage';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        if (key === 'DB_HOST') dbHost = value;
        if (key === 'DB_PORT') dbPort = parseInt(value);
        if (key === 'DB_USER') dbUser = value;
        if (key === 'DB_PASSWORD') dbPass = value;
        if (key === 'DB_DATABASE') dbName = value;
      }
    }
  });
}

async function run() {
  const isLocal = !dbHost || dbHost === 'localhost' || dbHost === '127.0.0.1';
  const pool = mysql.createPool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    database: dbName,
    ssl: isLocal ? undefined : { rejectUnauthorized: false }
  });

  try {
    const [rows] = await pool.execute('SELECT id, name, email, subject, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5');
    console.log('Last 5 Inquiries:');
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
