import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';
import { auth } from '@/auth'; 

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

// Handler untuk mengambil semua live TV streams
export async function GET() {
  try {
    const liveStreams = await prisma.liveTV.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(liveStreams, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch live TV streams:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data live TV" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handler untuk membuat live TV stream baru
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, embedUrl } = data;

    if (!title || !embedUrl) {
      return NextResponse.json(
        { error: "Judul dan embed URL wajib diisi" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create the live TV stream
    const liveStream = await prisma.liveTV.create({
      data: {
        title,
        embedUrl,
        isActive: false, // Default to inactive, admin needs to activate manually
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(liveStream, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Failed to create live TV stream:", error);
    return NextResponse.json(
      { error: "Gagal membuat live TV stream" },
      { status: 500, headers: corsHeaders }
    );
  }
}
