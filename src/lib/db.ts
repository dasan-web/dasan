import mysql from 'mysql2/promise';

const globalForDb = global as unknown as { pool: mysql.Pool };

export function getDbPool() {
  if (!globalForDb.pool) {
    globalForDb.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'ektks0518!',
      database: process.env.DB_DATABASE || 'dasan_homepage',
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    });
  }
  return globalForDb.pool;
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const dbPool = getDbPool();
  try {
    const [results] = await dbPool.execute(sql, params);
    return results as T;
  } catch (error: any) {
    console.error('Database query error:', error);
    throw error;
  }
}
