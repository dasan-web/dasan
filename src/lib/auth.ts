import crypto from 'crypto';

// Secret key for AES encryption - derived from process.env.DB_PASSWORD or fallback
const SECRET = process.env.DB_PASSWORD || 'dasan-admin-portal-session-secret-key-32b';
const key = crypto.createHash('sha256').update(SECRET).digest(); // Exactly 32 bytes

/**
 * Hash a password using SHA-256
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Encrypt session payload into a token
 */
export function encryptSession(payload: any): string {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (err) {
    console.error('Session encryption error:', err);
    return '';
  }
}

/**
 * Decrypt session token back to payload
 */
export function decryptSession(token: string): any | null {
  try {
    if (!token || !token.includes(':')) return null;
    const [ivHex, encryptedHex] = token.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (err) {
    return null;
  }
}
