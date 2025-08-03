
'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-red-500">Akses Ditolak</h1>
        <p className="text-gray-300">Anda tidak memiliki izin untuk mengakses halaman ini. Hanya pengguna dengan peran ADMIN yang diizinkan.</p>
        <Link href="/login" className="inline-block px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Kembali ke Halaman Login
        </Link>
      </div>
    </div>
  );
}
