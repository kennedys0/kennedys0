import { NextRequest, NextResponse } from 'next/server';
import { getAllChallenges, getChallengeById, saveChallenge } from '@/lib/store';
import { verifySessionToken } from '@/lib/auth';
import { ChallengeStatus } from '@/types';

function checkAdminAuth(req: NextRequest): boolean {
  const session = req.cookies.get('fekojewan_admin_session');
  if (!session?.value) return false;
  return verifySessionToken(session.value);
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 401 });
  }

  const challenges = await getAllChallenges();
  return NextResponse.json({ challenges });
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized administrative access' }, { status: 401 });
  }

  try {
    const { id, status, adminNotes, publishedSummary } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing challenge ID' }, { status: 400 });
    }

    const challenge = await getChallengeById(id);
    if (!challenge) {
      return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
    }

    if (status) {
      challenge.status = status as ChallengeStatus;
    }
    if (adminNotes !== undefined) {
      challenge.adminNotes = adminNotes;
    }
    if (publishedSummary !== undefined) {
      challenge.publishedSummary = publishedSummary;
    }
    challenge.updatedAt = new Date().toISOString();

    await saveChallenge(challenge);

    return NextResponse.json({ success: true, challenge });
  } catch (error) {
    console.error('Error in PATCH /api/admin/challenges:', error);
    return NextResponse.json({ error: 'Failed to update challenge' }, { status: 500 });
  }
}
