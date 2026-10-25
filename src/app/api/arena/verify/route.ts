import { NextRequest, NextResponse } from 'next/server';
import { verifyExerciseFlag } from '@/lib/arena-data';

export async function POST(req: NextRequest) {
  try {
    const { exerciseId, flag } = await req.json();

    if (!exerciseId || !flag) {
      return NextResponse.json({ error: 'Exercise ID and flag answer are required.' }, { status: 400 });
    }

    const isCorrect = verifyExerciseFlag(exerciseId, flag);

    if (isCorrect) {
      return NextResponse.json({
        correct: true,
        message: 'Correct! Security flaw identified and flag validated.',
      });
    } else {
      return NextResponse.json({
        correct: false,
        message: 'Incorrect flag or reasoning. Inspect the HTTP headers and payload parameters again.',
      });
    }
  } catch (error) {
    console.error('Error in /api/arena/verify:', error);
    return NextResponse.json({ error: 'Server error during flag verification' }, { status: 500 });
  }
}
