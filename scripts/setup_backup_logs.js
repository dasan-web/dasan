const mysql = require('mysql2/promise');

async function setup() {
  try {
    const conn = await mysql.createConnection({
      host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: '34mGcDTA8bbMoj7.root',
      password: '3h8a12Y8gOr6fbVj',
      database: 'dasan_homepage',
      ssl: {
        minVersion: 'TLSv1.2'
      }
    });

    await conn.query(`
      CREATE TABLE IF NOT EXISTS backup_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        ip_address VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Table backup_logs created successfully.');
    await conn.end();
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

setup();
