import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password diperlukan" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Hapus password dari respons
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Pendaftaran berhasil",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat mendaftarkan pengguna:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat mendaftarkan pengguna" },
      { status: 500 }
    );
  }
}