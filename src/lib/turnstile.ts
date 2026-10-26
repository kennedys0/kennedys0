export interface TurnstileVerificationResult {
  success: boolean;
  error?: string;
  challengeTs?: string;
  hostname?: string;
}

/**
 * Verifies a Cloudflare Turnstile token via Cloudflare's siteverify API.
 * Uses official always-passes test secret key in local development if no key is configured.
 */
export async function verifyTurnstileToken(
  token?: string | null,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return { success: false, error: 'Cloudflare CAPTCHA verification token is missing.' };
  }

  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

  // Support simulated offline dev token for local testing
  if (
    (secretKey === '1x0000000000000000000000000000000AA' || process.env.NODE_ENV !== 'production') &&
    token.startsWith('XXXX.DUMMY.TOKEN')
  ) {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Cloudflare Turnstile verification server responded with HTTP ${res.status}.`,
      };
    }

    const outcome = await res.json();
    if (outcome.success) {
      return {
        success: true,
        challengeTs: outcome.challenge_ts,
        hostname: outcome.hostname,
      };
    }

    const errorCodes = Array.isArray(outcome['error-codes'])
      ? outcome['error-codes'].join(', ')
      : 'Invalid token';

    return {
      success: false,
      error: `Cloudflare CAPTCHA validation failed: ${errorCodes}`,
    };
  } catch (err: any) {
    // If in development with the default test key and network is unreachable (offline container/local dev)
    if (secretKey === '1x0000000000000000000000000000000AA' && process.env.NODE_ENV !== 'production') {
      console.warn('Turnstile siteverify unreachable in local dev, permitting dummy test key.');
      return { success: true };
    }

    console.error('Turnstile verification network error:', err);
    return {
      success: false,
      error: 'Unable to reach Cloudflare verification service. Please try again.',
    };
  }
}
