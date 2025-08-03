'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      Configuration: 'Terjadi kesalahan pada konfigurasi server.',
      AccessDenied: 'Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.',
      Verification: 'Link verifikasi telah kadaluarsa atau telah digunakan.',
      Default: 'Terjadi kesalahan saat autentikasi.',
    };

    setErrorMessage(errorMessages[error as string] || errorMessages.Default);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Autentikasi</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {errorMessage}
          </div>
          <p className="text-gray-600 mb-6">
            Silakan coba login kembali atau hubungi administrator jika masalah berlanjut.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Kembali ke Login
            </Link>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
