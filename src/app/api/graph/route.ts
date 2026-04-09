import { NextResponse } from 'next/server';
import { getGraphData } from '@/lib/markdown';

export async function GET() {
  try {
    const data = await getGraphData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ nodes: [], links: [] }, { status: 500 });
  }
}
