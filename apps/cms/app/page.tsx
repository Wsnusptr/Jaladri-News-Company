import Link from 'next/link';
import { BookOpen, PlusCircle, FileText } from 'lucide-react';

// Halaman ini sekarang menjadi komponen server yang sederhana
export default function CmsHomePage() {
  // Tidak perlu lagi ada pengecekan sesi di sini,
  // karena AuthGuard di layout.tsx sudah melindunginya.

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Selamat Datang di Dasbor CMS</h1>
        <p className="mt-2 text-gray-600">
          Pilih salah satu menu di bawah untuk mulai mengelola konten website Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kartu Review Draft Artikel */}
        <Link
          href="/drafts"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <FileText className="h-10 w-10 text-yellow-600 mb-4 group-hover:text-yellow-700" />
          <h2 className="text-xl font-semibold text-gray-900">Review Draft Artikel</h2>
          <p className="mt-2 text-sm text-gray-500">
            Setujui atau tolak artikel yang dikirim oleh kontributor.
          </p>
        </Link>

        {/* Kartu Manajemen Artikel */}
        <Link
          href="/articles"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <BookOpen className="h-10 w-10 text-blue-600 mb-4 group-hover:text-blue-700" />
          <h2 className="text-xl font-semibold text-gray-900">Manajemen Artikel</h2>
          <p className="mt-2 text-sm text-gray-500">
            Lihat, edit, dan kelola semua artikel yang sudah dipublikasikan.
          </p>
        </Link>

        {/* Kartu Tambah Artikel Baru */}
        <Link
          href="/articles/new"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <PlusCircle className="h-10 w-10 text-green-600 mb-4 group-hover:text-green-700" />
          <h2 className="text-xl font-semibold text-gray-900">Tambah Artikel Baru</h2>
          <p className="mt-2 text-sm text-gray-500">
            Buat dan publikasikan artikel baru langsung sebagai admin.
          </p>
        </Link>
      </div>
    </div>
  );
}
