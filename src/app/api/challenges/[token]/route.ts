import { NextRequest, NextResponse } from 'next/server';
import { getChallengeByToken } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token || token.length < 16) {
      return NextResponse.json({ error: 'Invalid tracking token format' }, { status: 400 });
    }

    const challenge = await getChallengeByToken(token);
    if (!challenge) {
      return NextResponse.json(
        { error: 'No challenge found matching this tracking token. Please verify the code.' },
        { status: 404 }
      );
    }

    // Return public status view (mask confidential info)
    return NextResponse.json({
      trackingToken: challenge.trackingToken,
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty,
      status: challenge.status,
      createdAt: challenge.createdAt,
      updatedAt: challenge.updatedAt,
      publishedSummary: challenge.publishedSummary,
    });
  } catch (error) {
    console.error('Error fetching challenge by token:', error);
    return NextResponse.json({ error: 'Failed to look up challenge tracking' }, { status: 500 });
  }
}
