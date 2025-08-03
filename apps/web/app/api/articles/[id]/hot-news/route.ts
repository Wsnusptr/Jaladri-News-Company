import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@repo/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await request.json();
    const { isHotNews } = body;

    if (typeof isHotNews !== "boolean") {
      return NextResponse.json({ error: "isHotNews must be a boolean" }, { status: 400 });
    }

    // Update article hot news status
    const article = await prisma.article.update({
      where: { id: params.id },
      data: { isHotNews },
      include: {
        author: {
          select: { name: true, email: true }
        },
        categories: true
      }
    });

    // Create notification for author if setting as hot news
    if (isHotNews && article.author) {
      await prisma.notification.create({
        data: {
          title: "Artikel Dijadikan Hot News",
          message: `Artikel Anda "${article.title}" telah dijadikan hot news.`,
          type: "SUCCESS",
          userId: article.authorId!,
          articleId: article.id,
          isRead: false,
        }
      });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating hot news status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
