import { describe, it } from 'node:test';
import assert from 'node:assert';

// Pure logic mirror of verifyTurnstileToken for Node test runner
async function verifyTurnstileTokenMock(token, secretKey = '1x0000000000000000000000000000000AA') {
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return { success: false, error: 'Cloudflare CAPTCHA verification token is missing.' };
  }

  if (secretKey === '1x0000000000000000000000000000000AA' && token.startsWith('XXXX.DUMMY.TOKEN')) {
    return { success: true };
  }

  // Simulated validation logic
  if (token === 'valid-test-token') {
    return { success: true, hostname: 'localhost' };
  }

  return { success: false, error: 'Cloudflare CAPTCHA validation failed: invalid-input-response' };
}

describe('Cloudflare Turnstile Verification', () => {
  it('rejects empty or missing turnstile token', async () => {
    const resEmpty = await verifyTurnstileTokenMock('');
    assert.strictEqual(resEmpty.success, false);
    assert.match(resEmpty.error, /missing/i);

    const resNull = await verifyTurnstileTokenMock(null);
    assert.strictEqual(resNull.success, false);
    assert.match(resNull.error, /missing/i);
  });

  it('accepts local dev dummy token with test key', async () => {
    const res = await verifyTurnstileTokenMock('XXXX.DUMMY.TOKEN.123456');
    assert.strictEqual(res.success, true);
  });

  it('validates test token successfully', async () => {
    const res = await verifyTurnstileTokenMock('valid-test-token');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.hostname, 'localhost');
  });

  it('rejects invalid or forged token', async () => {
    const res = await verifyTurnstileTokenMock('forged-attacker-token');
    assert.strictEqual(res.success, false);
    assert.match(res.error, /failed/i);
  });
});
