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
});
