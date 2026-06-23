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

async function init() {
  console.log('Connecting to MySQL host:', process.env.DB_HOST || 'localhost');
  
  // Connect without database selected first to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ektks0518!',
    multipleStatements: true,
  });

  try {
    console.log('Successfully connected to MySQL server.');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing database schema script...');
    await connection.query(schemaSql);
    
    console.log('Database and tables created and seeded successfully.');
  } catch (err) {
    console.error('Error during database initialization:', err);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

init();
