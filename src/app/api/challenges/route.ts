import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAllChallenges, saveChallenge } from '@/lib/store';
import { generateTrackingToken, checkRateLimit, sanitizeText } from '@/lib/security';
import { ChallengeSubmission, ChallengeCategory, ChallengeDifficulty } from '@/types';

export async function GET() {
  try {
    const all = await getAllChallenges();
    // Only return solved/published challenges for public showcase
    const showcase = all
      .filter((c) => c.status === 'Solved' && c.publishedSummary)
      .map((c) => ({
        id: c.id,
        title: sanitizeText(c.title),
        category: c.category,
        difficulty: c.difficulty,
        publishedSummary: c.publishedSummary,
        createdAt: c.createdAt,
      }));

    return NextResponse.json({ showcase });
  } catch (error) {
    console.error('Error in GET /api/challenges:', error);
    return NextResponse.json({ error: 'Failed to retrieve challenges' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check — use trusted edge headers before untrusted x-forwarded-for
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';
    if (!checkRateLimit(clientIp.split(',')[0].trim(), 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many challenge submissions. Please try again later.' },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed or empty JSON request payload.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body must be a valid JSON object.' },
        { status: 400 }
      );
    }

    const {
      challengerName,
      challengerEmail,
      title,
      category,
      difficulty,
      description,
      objective,
      environmentType,
      authorizedScope,
      reproductionPrerequisites,
      referenceLinks,
      rulesConstraints,
      consentAttestation,
      honeypot,
    } = body;

    // Honeypot trap against automated spam bots
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Challenge received' });
    }

    // Helper functions for safe string processing
    const safeString = (val: unknown): string => (typeof val === 'string' ? val.trim() : '');
    const coerceOptionalString = (val: unknown): string | undefined => {
      if (val === undefined || val === null) return undefined;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        return trimmed ? sanitizeText(trimmed) : undefined;
      }
      if (Array.isArray(val)) {
        const joined = val.map((x) => String(x).trim()).filter(Boolean).join(', ');
        return joined ? sanitizeText(joined) : undefined;
      }
      const str = String(val).trim();
      return str ? sanitizeText(str) : undefined;
    };

    // Mandatory authorization & permission attestation
    if (!consentAttestation || consentAttestation === 'false') {
      return NextResponse.json(
        { error: 'You must attest that you own or have explicit authorization to submit this target environment.' },
        { status: 400 }
      );
    }

    const name = safeString(challengerName);
    const email = safeString(challengerEmail);
    const challengeTitle = safeString(title);
    const desc = safeString(description);
    const scope = safeString(authorizedScope);

    // Required fields validation
    if (!name || !email || !challengeTitle || !desc || !scope) {
      return NextResponse.json(
        { error: 'Required fields are missing or empty: name, email, title, description, and authorized scope.' },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid contact email.' }, { status: 400 });
    }

    const trackingToken = generateTrackingToken();
    const now = new Date().toISOString();

    const submission: ChallengeSubmission = {
      id: `ch-${crypto.randomUUID()}`,
      trackingToken,
      challengerName: sanitizeText(name),
      challengerEmail: email, // Stored securely; never exposed in public tracking
      title: sanitizeText(challengeTitle),
      category: (safeString(category) || 'Other') as ChallengeCategory,
      difficulty: (safeString(difficulty) || 'Intermediate') as ChallengeDifficulty,
      description: sanitizeText(desc),
      objective: coerceOptionalString(objective) || 'Identify security vulnerability in specified scope.',
      environmentType: coerceOptionalString(environmentType) || 'Staging / Lab',
      authorizedScope: sanitizeText(scope),
      reproductionPrerequisites: coerceOptionalString(reproductionPrerequisites),
      referenceLinks: coerceOptionalString(referenceLinks),
      rulesConstraints: coerceOptionalString(rulesConstraints),
      status: 'Submitted',
      createdAt: now,
      updatedAt: now,
    };

    await saveChallenge(submission);

    return NextResponse.json(
      {
        success: true,
        message: 'Challenge submitted successfully. It will be reviewed by FEKOJEWAN.',
        trackingToken,
        status: submission.status,
        createdAt: submission.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/challenges:', error);
    return NextResponse.json({ error: 'Internal server error processing challenge.' }, { status: 500 });
  }
}
