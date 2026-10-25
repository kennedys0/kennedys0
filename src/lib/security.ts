import crypto from 'crypto';

/**
 * Generate a cryptographically secure 24-character hexadecimal tracking token.
 * This guarantees unguessable, non-enumerable challenge tracking.
 */
export function generateTrackingToken(): string {
  return crypto.randomBytes(12).toString('hex');
}

/**
 * Verify secret password in constant time to prevent timing attacks.
 */
export function verifySecret(input: string, targetSecret: string): boolean {
  if (!input || !targetSecret) return false;
  const inputBuffer = Buffer.from(input, 'utf8');
  const targetBuffer = Buffer.from(targetSecret, 'utf8');
  
  if (inputBuffer.length !== targetBuffer.length) {
    // Constant time dummy check to avoid length leakage
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }
  
  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

/**
 * Basic in-memory rate limiter for submissions.
 * Limits submissions to 5 per 15-minute window per IP.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count += 1;
  return true;
}

/**
 * Sanitize text inputs by escaping HTML characters
 */
export function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
