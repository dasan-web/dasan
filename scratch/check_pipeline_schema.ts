import { query } from '../src/lib/db';

async function main() {
  try {
    const cols = await query('SHOW COLUMNS FROM pipeline');
    console.log('PIPELINE_TABLE_COLUMNS:', cols);
    const rows = await query('SELECT * FROM pipeline');
    console.log('PIPELINE_CURRENT_ROWS:', rows);
    process.exit(0);
  } catch (err) {
    console.error('ERROR_CHECKING_SCHEMA:', err);
    process.exit(1);
  }
}

main();
