import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { deleteLiveTVComment } from '@repo/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    const { commentId } = await params;
    const result = await deleteLiveTVComment(commentId, session.user.id);

    if (!result.success) {
      if (result.error === 'Unauthorized') {
        return NextResponse.json(
          { error: 'You can only delete your own comments' },
          { status: 403 }
        );
      }
      if (result.error === 'Comment not found') {
        return NextResponse.json(
          { error: 'Comment not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting Live TV comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
