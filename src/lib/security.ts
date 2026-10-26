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

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

export function checkDetailedRateLimit(
  bucketKey: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(bucketKey);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - record.count),
    resetInSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
  };
}

export function resetRateLimit(bucketKey: string): void {
  rateLimitMap.delete(bucketKey);
}

export function checkRateLimit(ip: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  return checkDetailedRateLimit(ip, limit, windowMs).allowed;
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
