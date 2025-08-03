// apps/web/app/unauthorized/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-gray-700 mb-4">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya tersedia untuk admin.
          </p>
          <p className="text-sm text-gray-500">
            Anda akan dialihkan ke halaman utama dalam 5 detik.
          </p>
        </div>
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link 
            href="/kirim-tulisan"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Kirim Tulisan
          </Link>
        </div>
      </div>
    </div>
  );
}
