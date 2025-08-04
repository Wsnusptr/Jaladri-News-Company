import { prisma } from './client';
import { NotificationType } from '@prisma/client';

interface CreateNotificationProps {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  articleId?: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type = 'INFO',
  articleId
}: CreateNotificationProps) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        articleId,
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      }
    });

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function getUserNotifications(userId: string, limit: number = 20) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: notificationId,
        userId // Ensure user can only mark their own notifications
      },
      data: { isRead: true }
    });

    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false
      },
      data: { isRead: true }
    });

    return result;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

export async function getUnreadNotificationCount(userId: string) {
  try {
    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false
      }
    });

    return count;
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}

export async function deleteNotification(notificationId: string, userId: string) {
  try {
    const notification = await prisma.notification.delete({
      where: {
        id: notificationId,
        userId // Ensure user can only delete their own notifications
      }
    });

    return notification;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}

// Helper function to create article approval notification
export async function notifyArticleApproved(articleId: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true }
    });

    if (!article || !article.authorId) {
      return null;
    }

    return await createNotification({
      userId: article.authorId,
      title: '🎉 Artikel Anda Telah Disetujui!',
      message: `Artikel "${article.title}" telah disetujui dan dipublikasikan. Terima kasih atas kontribusi Anda!`,
      type: 'ARTICLE_APPROVED',
      articleId: article.id
    });
  } catch (error) {
    console.error('Error creating approval notification:', error);
    throw error;
  }
}

// Helper function to create article rejection notification
export async function notifyArticleRejected(articleId: string, reason?: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true }
    });

    if (!article || !article.authorId) {
      return null;
    }

    const message = reason
      ? `Artikel "${article.title}" tidak dapat dipublikasikan. Alasan: ${reason}. Silakan revisi dan kirim ulang.`
      : `Artikel "${article.title}" tidak dapat dipublikasikan saat ini. Silakan hubungi admin untuk informasi lebih lanjut.`;

    return await createNotification({
      userId: article.authorId,
      title: '❌ Artikel Perlu Diperbaiki',
      message,
      type: 'ARTICLE_REJECTED',
      articleId: article.id
    });
  } catch (error) {
    console.error('Error creating rejection notification:', error);
    throw error;
  }
}

// Notification types are already exported from index.ts
