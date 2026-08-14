import mysql from 'mysql2/promise';

async function checkDbs() {
  console.log('--- 1. Checking Cloud TiDB ---');
  try {
    const cloudConn = await mysql.createConnection({
      host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: '34mGcDTA8bbMoj7.root',
      password: '3h8a12Y8gOr6fbVj',
      database: 'dasan_homepage',
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }
    });
    const [cloudRows]: any = await cloudConn.query('SELECT id, name, file_url FROM products WHERE name LIKE "%클피그렐정%" OR id = 1');
    console.log('Cloud TiDB clpigrel rows:', cloudRows);
    await cloudConn.end();
  } catch (err) {
    console.error('Cloud TiDB error:', err);
  }

  console.log('\n--- 2. Checking Local MySQL/TiDB on port 3306 ---');
  try {
    const localConn = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'dasan_homepage'
    });
    const [localRows]: any = await localConn.query('SELECT * FROM products WHERE name LIKE "%클피그렐정%" OR id = 1');
    console.log('Local DB (3306) clpigrel rows:', localRows);
    await localConn.end();
  } catch (err: any) {
    console.log('Local DB (3306) error:', err.message);
  }

  console.log('\n--- 3. Checking Local MySQL/TiDB on port 4000 ---');
  try {
    const localConn4000 = await mysql.createConnection({
      host: '127.0.0.1',
      port: 4000,
      user: 'root',
      password: '',
      database: 'dasan_homepage'
    });
    const [localRows4000]: any = await localConn4000.query('SELECT * FROM products WHERE name LIKE "%클피그렐정%" OR id = 1');
    console.log('Local DB (4000) clpigrel rows:', localRows4000);
    await localConn4000.end();
  } catch (err: any) {
    console.log('Local DB (4000) error:', err.message);
  }
}

checkDbs();
