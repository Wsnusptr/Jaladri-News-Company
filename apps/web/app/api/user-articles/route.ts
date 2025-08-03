import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@repo/db";
import { generateUniqueSlug } from "@/lib/slug-utils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, category, imageUrl, type } = body;

    if (!title || !content || !category || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique slug from title
    const slug = await generateUniqueSlug(title);

    // Check if category exists (convert to lowercase for slug matching)
    const categorySlug = category.toLowerCase();
    const categoryRecord = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!categoryRecord) {
      return NextResponse.json({ error: `Category with slug '${categorySlug}' not found.` }, { status: 400 });
    }

    // Verifikasi bahwa user ada di database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found in database" }, { status: 400 });
    }

    try {
      const article = await prisma.article.create({
        data: {
          title,
          content,
          imageUrl,
          type: type || "JALADRI_NETWORK", // Default to JALADRI_NETWORK
          status: "DRAFT", // Articles start as drafts and need admin approval
          authorId: session.user.id,
          slug,
          categories: { connect: [{ id: categoryRecord.id }] },
        },
      });

      // Buat notifikasi untuk admin
      // Cari admin untuk mengirim notifikasi
      const admin = await prisma.user.findFirst({
        where: { role: "ADMIN" }
      });

      if (admin) {
        await prisma.notification.create({
          data: {
            title: "Artikel Baru Dikirim",
            message: `Artikel baru "${title}" telah dikirim dan menunggu persetujuan.`,
            articleId: article.id,
            userId: admin.id,
            isRead: false,
            type: "ARTICLE_SUBMISSION",
          }
        });
      }

      return NextResponse.json(article, { status: 201 });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      // Berikan pesan error yang lebih spesifik
      if (dbError.code === 'P2003') {
        return NextResponse.json({
          error: "Gagal membuat artikel. Pastikan Anda sudah login dengan benar.",
          details: dbError.message
        }, { status: 400 });
      }
      throw dbError; // Re-throw untuk ditangkap oleh catch di luar
    }
  } catch (error) {
    console.error("Error creating user article:", error);
    return NextResponse.json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
