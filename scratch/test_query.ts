import { query } from '../src/lib/db';

async function main() {
  try {
    const res = await query('SELECT * FROM pipeline ORDER BY sort_order ASC, id ASC');
    console.log('QUERY_SUCCESS:', res);
    process.exit(0);
  } catch (err) {
    console.error('QUERY_ERROR:', err);
    process.exit(1);
  }
}

main();
