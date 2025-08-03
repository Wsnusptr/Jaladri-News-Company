import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getLiveTVComments, createLiveTVComment } from '@repo/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await getLiveTVComments(id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching Live TV comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    const comment = await createLiveTVComment({
      liveTVId: id,
      userId: session.user.id,
      message: message.trim()
    });

    if (!comment) {
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating Live TV comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
