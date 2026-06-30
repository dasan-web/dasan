const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function setup() {
  const isLocal = !process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ektks0518!',
    database: process.env.DB_DATABASE || 'dasan_homepage',
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
    ssl: isLocal ? undefined : { rejectUnauthorized: false }
  });

  try {
    const query = `
      CREATE TABLE IF NOT EXISTS popups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        link_url VARCHAR(255),
        start_date DATETIME,
        end_date DATETIME,
        is_active BOOLEAN DEFAULT 1,
        width INT DEFAULT 400,
        height INT DEFAULT 400,
        top_pos INT DEFAULT 100,
        left_pos INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await pool.execute(query);
    console.log('Popups table created successfully');
  } catch (err) {
    console.error('Error creating popups table:', err);
  } finally {
    await pool.end();
  }
}

setup();
