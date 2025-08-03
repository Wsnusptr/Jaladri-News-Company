import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserNotifications, getUnreadNotificationCount, markAllNotificationsAsRead } from '@repo/db/notifications';

// GET - Fetch user notifications
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unread') === 'true';

    if (unreadOnly) {
      const count = await getUnreadNotificationCount(session.user.id);
      return NextResponse.json({ count });
    }

    const notifications = await getUserNotifications(session.user.id, limit);
    
    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Mark all notifications as read
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();
    
    if (action === 'mark_all_read') {
      await markAllNotificationsAsRead(session.user.id);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
