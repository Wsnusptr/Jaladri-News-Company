// apps/web/app/profile/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session.user?.name) {
      setName(session.user.name);
    }
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      // Memicu NextAuth untuk memperbarui data sesi
      await update({ name });
      alert('Profil berhasil diperbarui!');
      setIsEditing(false);
    } else {
      alert('Gagal memperbarui profil.');
    }
  };

  if (status === "loading") {
    return <div className="text-center p-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-6 mb-6">
          <Image src={session?.user?.image || '/logo.png'} alt="Avatar" width={80} height={80} className="rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {!isEditing ? (
            <div className="flex justify-between items-center">
              <p>Selamat datang di halaman profil Anda.</p>
              <button onClick={() => setIsEditing(true)} className="text-blue-600 text-sm font-semibold">Edit Nama</button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Ubah Nama</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Simpan</button>
              </div>
            </form>
          )}
        </div>
        
        <div className="border-t mt-6 pt-6">
          <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full text-left text-red-600 hover:bg-red-50 p-2 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}