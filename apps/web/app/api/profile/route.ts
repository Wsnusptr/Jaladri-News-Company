import { NextResponse } from 'next/server';
import { prisma } from '@repo/db/client';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    if (name) {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: { name },
      });
      return NextResponse.json({ name: updatedUser.name });
    }

    if (currentPassword && newPassword) {
      // Validate current password
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user || !user.password) {
        return NextResponse.json({ error: 'User not found or password not set' }, { status: 400 });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      // Hash new password and update
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedNewPassword },
      });

      return NextResponse.json({ message: 'Password updated successfully' });
    }

    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
