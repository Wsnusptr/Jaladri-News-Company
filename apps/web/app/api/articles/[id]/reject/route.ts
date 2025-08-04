import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';
import { notifyArticleRejected } from '@repo/db/notifications';

// Header CORS untuk mengizinkan permintaan dari CMS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handler untuk permintaan OPTIONS (pre-flight request)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST - Reject article with reason
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { reason } = await request.json();

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Send rejection notification if article has an author
    if (article.authorId) {
      try {
        await notifyArticleRejected(article.id, reason);
      } catch (error) {
        console.error('Error sending rejection notification:', error);
        // Continue with rejection even if notification fails
      }
    }

    // Update article status to REJECTED or delete based on preference
    // For now, we'll update status to REJECTED
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        status: 'REJECTED',
        updatedAt: new Date()
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(
      {
        message: "Artikel berhasil ditolak",
        article: updatedArticle
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to reject article:", error);
    return NextResponse.json(
      { error: "Gagal menolak artikel" },
      { status: 500, headers: corsHeaders }
    );
  }
}
