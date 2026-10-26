import { describe, it } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';

function verifySecret(input, targetSecret) {
  if (!input || !targetSecret) return false;
  const inputBuffer = Buffer.from(input, 'utf8');
  const targetBuffer = Buffer.from(targetSecret, 'utf8');
  
  if (inputBuffer.length !== targetBuffer.length) {
    crypto.timingSafeEqual(inputBuffer, inputBuffer);
    return false;
  }
  
  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

describe('Security Primitives', () => {
  it('generates a 24-character hexadecimal tracking token', () => {
    const token = crypto.randomBytes(12).toString('hex');
    assert.strictEqual(token.length, 24);
    assert.match(token, /^[0-9a-f]{24}$/);
  });

  it('constant-time password comparison verifies accurately', () => {
    const secret = 'fekojewan-sec-review-2026';
    assert.strictEqual(verifySecret('fekojewan-sec-review-2026', secret), true);
    assert.strictEqual(verifySecret('wrong-secret-guess-12345', secret), false);
    assert.strictEqual(verifySecret('wrong-length', secret), false);
  });

  it('escapes dangerous HTML characters', () => {
    function sanitize(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    const payload = '<script>alert("XSS")</script>';
    const sanitized = sanitize(payload);
    assert.strictEqual(sanitized, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
  });

  it('verifies SHA-256 flag hashes correctly', () => {
    const flag = 'FEKO{bola_order_id_sequential_leak}';
    const hash = crypto.createHash('sha256').update(flag.trim()).digest('hex');
    const expected = crypto.createHash('sha256').update('FEKO{bola_order_id_sequential_leak}').digest('hex');

    assert.strictEqual(hash, expected);
  });

  it('rate limiter enforces thresholds and calculates reset times', () => {
    const rateMap = new Map();
    function checkDetailedRateLimit(bucket, limit, windowMs) {
      const now = Date.now();
      const rec = rateMap.get(bucket);
      if (!rec || now > rec.resetAt) {
        rateMap.set(bucket, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
      }
      if (rec.count >= limit) {
        return { allowed: false, remaining: 0, resetInSeconds: Math.ceil((rec.resetAt - now) / 1000) };
      }
      rec.count += 1;
      return { allowed: true, remaining: limit - rec.count, resetInSeconds: Math.ceil((rec.resetAt - now) / 1000) };
    }

    const ip = '198.51.100.99';
    for (let i = 0; i < 5; i++) {
      const res = checkDetailedRateLimit(ip, 5, 60000);
      assert.strictEqual(res.allowed, true);
    }
    const blocked = checkDetailedRateLimit(ip, 5, 60000);
    assert.strictEqual(blocked.allowed, false);
    assert.strictEqual(blocked.remaining, 0);
    assert.ok(blocked.resetInSeconds > 0);
  });
});
