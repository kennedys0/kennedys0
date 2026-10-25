import { NextRequest, NextResponse } from 'next/server';
import { verifySecret } from '@/lib/security';
import { createSessionToken } from '@/lib/auth';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'fekojewan-sec-review-2026';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !verifySecret(password, ADMIN_SECRET)) {
      return NextResponse.json({ error: 'Invalid administrative passkey.' }, { status: 401 });
    }

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
