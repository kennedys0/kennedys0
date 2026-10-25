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

    const body = await req.json();
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

    // Mandatory authorization & permission attestation
    if (!consentAttestation) {
      return NextResponse.json(
        { error: 'You must attest that you own or have explicit authorization to submit this target environment.' },
        { status: 400 }
      );
    }

    // Required fields validation
    if (!challengerName?.trim() || !challengerEmail?.trim() || !title?.trim() || !description?.trim() || !authorizedScope?.trim()) {
      return NextResponse.json(
        { error: 'Required fields are missing: name, email, title, description, and authorized scope.' },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(challengerEmail.trim())) {
      return NextResponse.json({ error: 'Please provide a valid contact email.' }, { status: 400 });
    }

    const trackingToken = generateTrackingToken();
    const now = new Date().toISOString();

    const submission: ChallengeSubmission = {
      id: `ch-${crypto.randomUUID()}`,
      trackingToken,
      challengerName: sanitizeText(challengerName.trim()),
      challengerEmail: challengerEmail.trim(), // Stored securely; never exposed in public tracking
      title: sanitizeText(title.trim()),
      category: (category || 'Other') as ChallengeCategory,
      difficulty: (difficulty || 'Intermediate') as ChallengeDifficulty,
      description: sanitizeText(description.trim()),
      objective: sanitizeText(objective?.trim() || 'Identify security vulnerability in specified scope.'),
      environmentType: sanitizeText(environmentType?.trim() || 'Staging / Lab'),
      authorizedScope: sanitizeText(authorizedScope.trim()),
      reproductionPrerequisites: reproductionPrerequisites ? sanitizeText(reproductionPrerequisites.trim()) : undefined,
      referenceLinks: referenceLinks ? sanitizeText(referenceLinks.trim()) : undefined,
      rulesConstraints: rulesConstraints ? sanitizeText(rulesConstraints.trim()) : undefined,
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
