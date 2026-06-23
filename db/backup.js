const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        process.env[key] = value;
      }
    }
  });
}

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306');
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'ektks0518!';
const dbName = process.env.DB_DATABASE || 'dasan_homepage';

const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Generate date strings
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;
const backupFileName = `backup_${dbName}_${timestamp}.sql`;
const backupFilePath = path.join(backupDir, backupFileName);

async function runBackup() {
  console.log(`[${new Date().toISOString()}] Starting database backup for: ${dbName}...`);
  
  let connection;
  try {
    connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
    });

    let sqlDump = `-- Pure JS Database Backup for [${dbName}]\n`;
    sqlDump += `-- Date: ${new Date().toISOString()}\n\n`;
    sqlDump += `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
    sqlDump += `USE \`${dbName}\`;\n\n`;

    // 1. Get all tables
    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);

    for (const tableName of tableNames) {
      sqlDump += `--\n-- Table structure for table \`${tableName}\`\n--\n\n`;
      sqlDump += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;

      // 2. Get CREATE TABLE
      const [createRes] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
      const createSql = createRes[0]['Create Table'];
      sqlDump += `${createSql};\n\n`;

      // 3. Get table rows
      sqlDump += `--\n-- Dumping data for table \`${tableName}\`\n--\n\n`;
      const [rows] = await connection.query(`SELECT * FROM \`${tableName}\``);
      
      if (rows.length > 0) {
        const columns = Object.keys(rows[0]).map(col => `\`${col}\``).join(', ');
        sqlDump += `INSERT INTO \`${tableName}\` (${columns}) VALUES\n`;

        const rowValues = rows.map(row => {
          const values = Object.values(row).map(val => {
            if (val === null) return 'NULL';
            if (typeof val === 'number') return val;
            if (val instanceof Date) {
              return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
            }
            // Escape single quotes and backslashes for SQL safety
            const escaped = String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            return `'${escaped}'`;
          });
          return `(${values.join(', ')})`;
        });

        sqlDump += rowValues.join(',\n') + ';\n\n';
      }
    }

    fs.writeFileSync(backupFilePath, sqlDump, 'utf8');
    console.log(`Database backup completed successfully: ${backupFilePath}`);

    // Auto clean: Delete backups older than 30 days
    const retentionPeriod = 30 * 24 * 60 * 60 * 1000;
    const cutoffTime = Date.now() - retentionPeriod;
    const files = fs.readdirSync(backupDir);

    files.forEach(file => {
      if (file.endsWith('.sql')) {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && stats.mtimeMs < cutoffTime) {
          fs.unlinkSync(filePath);
          console.log(`Deleted expired backup: ${file}`);
        }
      }
    });

  } catch (err) {
    console.error('Backup failed:', err);
  } finally {
    if (connection) await connection.end();
  }
}

runBackup();
