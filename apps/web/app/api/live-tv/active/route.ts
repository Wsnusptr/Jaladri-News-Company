import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';

// Handler untuk mengambil live TV streams yang sedang aktif
export async function GET() {
  try {
    const activeLiveStreams = await prisma.liveTV.findMany({
      where: {
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 1, // Only get the most recent active stream
    });

    return NextResponse.json(activeLiveStreams);
  } catch (error) {
    console.error("Failed to fetch active live TV streams:", error);
    return NextResponse.json(
      { error: "Gagal mengambil live TV aktif" },
      { status: 500 }
    );
  }
}
