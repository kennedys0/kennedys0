import { NextRequest, NextResponse } from 'next/server';
import { verifySecret, checkDetailedRateLimit, resetRateLimit } from '@/lib/security';
import { createSessionToken } from '@/lib/auth';
import { verifyTurnstileToken } from '@/lib/turnstile';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'fekojewan-sec-review-2026';

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    // 1. Rate limiting: 5 failed attempts per 15-minute window
    const rateCheck = checkDetailedRateLimit(`admin-login:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Account lockout active. Please wait 15 minutes before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetInSeconds),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + rateCheck.resetInSeconds),
          },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Malformed or missing JSON request body.' }, { status: 400 });
    }

    const { password, turnstileToken } = body;

    // 2. Verify Cloudflare Turnstile CAPTCHA
    const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error || 'CAPTCHA validation failed. Please solve the challenge.' },
        {
          status: 403,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(rateCheck.remaining),
          },
        }
      );
    }

    // 3. Verify Administrative Passkey with artificial delay on failure
    if (!password || typeof password !== 'string' || !verifySecret(password, ADMIN_SECRET)) {
      // Artificial delay (400ms) to deter fast automated brute force and timing discrepancies
      await new Promise((resolve) => setTimeout(resolve, 400));
      return NextResponse.json(
        { error: 'Invalid administrative passkey.' },
        {
          status: 401,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(rateCheck.remaining),
          },
        }
      );
    }

    // Clear rate limit bucket on successful authentication
    resetRateLimit(`admin-login:${clientIp}`);

    const sessionToken = createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });

    // Set secure HttpOnly session cookie with HMAC-signed token
    response.cookies.set({
      name: 'fekojewan_admin_session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
