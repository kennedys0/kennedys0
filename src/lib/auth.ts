import crypto from 'crypto';

/**
 * HMAC-SHA256 signed session token management.
 *
 * Replaces the static 'authenticated_active' cookie value with a
 * timestamp-bound, cryptographically signed token that cannot be forged
 * without knowledge of the server-side secret.
 */

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  crypto.randomBytes(32).toString('hex');

const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Create a signed session token: `<timestamp>.<hmac-hex>`
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verify a signed session token:
 * 1. Parse timestamp and signature
 * 2. Check expiry
 * 3. Recompute HMAC and compare in constant time
 */
export function verifySessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;

  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;

  const timestamp = token.substring(0, dotIndex);
  const signature = token.substring(dotIndex + 1);

  if (!timestamp || !signature) return false;

  const ts = parseInt(timestamp, 10);
  if (!Number.isFinite(ts)) return false;

  // Enforce session expiry
  if (Date.now() - ts > SESSION_MAX_AGE_MS) return false;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(timestamp)
    .digest('hex');

  // Constant-time comparison over equal-length hex buffers
  const sigBuf = Buffer.from(signature, 'hex');
  const expectedBuf = Buffer.from(expectedSignature, 'hex');

  if (sigBuf.length !== expectedBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}
