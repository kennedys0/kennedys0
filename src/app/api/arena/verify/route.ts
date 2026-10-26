import { NextRequest, NextResponse } from 'next/server';
import { verifyExerciseFlag } from '@/lib/arena-server';
import { checkDetailedRateLimit } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    // F2 Mitigation: Rate limit flag submissions to 10 per minute per IP
    const rateCheck = checkDetailedRateLimit(`arena-verify:${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many flag verification attempts. Throttling active, please wait before submitting again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.resetInSeconds),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Malformed or empty JSON request payload.' }, { status: 400 });
    }

    const { exerciseId, flag } = body;

    if (!exerciseId || typeof exerciseId !== 'string' || !flag || typeof flag !== 'string') {
      return NextResponse.json(
        { error: 'Valid exercise ID and flag answer string are required.' },
        { status: 400 }
      );
    }

    const result = verifyExerciseFlag(exerciseId.trim(), flag.trim());

    if (result.correct) {
      return NextResponse.json(
        {
          correct: true,
          message: 'Correct! Security flaw identified and flag validated.',
          explanation: result.explanation,
          remediation: result.remediation,
        },
        {
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': String(rateCheck.remaining),
          },
        }
      );
    } else {
      // Delay response slightly to prevent automated microsecond flag dictionary brute-force
      await new Promise((resolve) => setTimeout(resolve, 250));

      return NextResponse.json(
        {
          correct: false,
          message: 'Incorrect flag or reasoning. Inspect the HTTP headers and payload parameters again.',
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': String(rateCheck.remaining),
          },
        }
      );
    }
  } catch (error) {
    console.error('Error in /api/arena/verify:', error);
    return NextResponse.json({ error: 'Server error during flag verification' }, { status: 500 });
  }
}
