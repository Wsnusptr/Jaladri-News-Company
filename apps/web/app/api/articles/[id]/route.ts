// apps/web/app/api/articles/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';
import { notifyArticleApproved, notifyArticleRejected } from '@repo/db/notifications';
import { generateUniqueSlugExcluding } from '@/lib/slug-utils';

// Header CORS untuk mengizinkan permintaan dari CMS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handler untuk permintaan OPTIONS (pre-flight request)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler untuk mengambil satu artikel berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Cari artikel berdasarkan ID
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Kembalikan data artikel
    return NextResponse.json(article, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handler untuk memperbarui artikel berdasarkan ID
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Periksa apakah artikel dengan ID tersebut ada
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Build update data object - only include fields that are provided
    let updateData: any = {};
    if (data.title !== undefined) {
      updateData.title = data.title;
      updateData.slug = await generateUniqueSlugExcluding(data.title, id);
    }
    if (data.content !== undefined) updateData.content = data.content;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.isHotNews !== undefined) updateData.isHotNews = data.isHotNews;
    if (data.isSlider !== undefined) updateData.isSlider = data.isSlider;
    if (data.isRecommendation !== undefined) updateData.isRecommendation = data.isRecommendation;
    if (data.categories !== undefined) {
      updateData.categories = {
        set: data.categories.map((id: string) => ({ id }))
      };
    }

    // Check if status is being changed to PUBLISHED for notification
    const wasApproved = updateData.status === 'PUBLISHED' && existingArticle.status === 'DRAFT';

    // Perbarui artikel di database
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
      },
    });

    // Send notification if article was approved
    if (wasApproved && updatedArticle.authorId) {
      try {
        await notifyArticleApproved(updatedArticle.id);
      } catch (error) {
        console.error('Error sending approval notification:', error);
        // Don't fail the main operation if notification fails
      }
    }

    // Kembalikan artikel yang telah diperbarui
    return NextResponse.json(updatedArticle, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui artikel" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handler untuk menghapus artikel berdasarkan ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Periksa apakah artikel dengan ID tersebut ada
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Hapus artikel dari database
    await prisma.article.delete({
      where: { id },
    });

    // Kembalikan respons sukses
    return NextResponse.json(
      { message: "Artikel berhasil dihapus" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete article:", error);
    return NextResponse.json(
      { error: "Gagal menghapus artikel" },
      { status: 500, headers: corsHeaders }
    );
  }
}
