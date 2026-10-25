import { NextResponse } from 'next/server';
import { ARENA_EXERCISES } from '@/lib/arena-data';

export async function GET() {
  return NextResponse.json({ exercises: ARENA_EXERCISES });
}
