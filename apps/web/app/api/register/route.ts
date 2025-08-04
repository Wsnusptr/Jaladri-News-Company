// apps/web/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('Data tidak lengkap', { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (exist) {
      return new NextResponse('Email sudah terdaftar', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
