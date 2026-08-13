import fs from 'fs';
import path from 'path';

// Manual env loader
if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  }
}

import { query } from '../src/lib/db';

async function main() {
  try {
    console.log('Connecting to DB Host:', process.env.DB_HOST);

    // Check if sort_order column exists in TiDB Cloud
    const cols: any = await query('SHOW COLUMNS FROM pipeline LIKE "sort_order"');
    if (!cols || cols.length === 0) {
      console.log('Adding sort_order column to TiDB Cloud pipeline table...');
      await query('ALTER TABLE pipeline ADD COLUMN sort_order INT DEFAULT 0');
      console.log('sort_order column added successfully to TiDB Cloud.');
    } else {
      console.log('sort_order column already exists in TiDB Cloud.');
    }

    // Set initial sort_order values
    const rows: any = await query('SELECT id FROM pipeline ORDER BY id ASC');
    for (let i = 0; i < rows.length; i++) {
      await query('UPDATE pipeline SET sort_order = ? WHERE id = ?', [i + 1, rows[i].id]);
    }
    console.log('Initialized sort_order values for existing rows in TiDB Cloud.');

    const check: any = await query('SELECT id, sort_order, category, project_name, disease FROM pipeline ORDER BY sort_order ASC');
    console.log('CHECK_PIPELINES_ORDER:', check);
    process.exit(0);
  } catch (err) {
    console.error('ERROR_ADDING_SORT_ORDER:', err);
    process.exit(1);
  }
}

main();
