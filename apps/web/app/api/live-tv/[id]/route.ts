import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';

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

// Handler untuk mengambil satu live TV stream berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const liveStream = await prisma.liveTV.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!liveStream) {
      return NextResponse.json(
        { error: "Live TV stream tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(liveStream, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to fetch live TV stream:", error);
    return NextResponse.json(
      { error: "Gagal mengambil live TV stream" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handler untuk memperbarui live TV stream berdasarkan ID
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Periksa apakah live TV stream dengan ID tersebut ada
    const existingStream = await prisma.liveTV.findUnique({
      where: { id },
    });

    if (!existingStream) {
      return NextResponse.json(
        { error: "Live TV stream tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Build update data object - only include fields that are provided
    let updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.embedUrl !== undefined) updateData.embedUrl = data.embedUrl;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    // Perbarui live TV stream di database
    const updatedStream = await prisma.liveTV.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(updatedStream, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to update live TV stream:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui live TV stream" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handler untuk menghapus live TV stream berdasarkan ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Periksa apakah live TV stream dengan ID tersebut ada
    const liveStream = await prisma.liveTV.findUnique({
      where: { id },
    });

    if (!liveStream) {
      return NextResponse.json(
        { error: "Live TV stream tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Hapus live TV stream dari database
    await prisma.liveTV.delete({
      where: { id },
    });

    // Kembalikan respons sukses
    return NextResponse.json(
      { message: "Live TV stream berhasil dihapus" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Failed to delete live TV stream:", error);
    return NextResponse.json(
      { error: "Gagal menghapus live TV stream" },
      { status: 500, headers: corsHeaders }
    );
  }
}
