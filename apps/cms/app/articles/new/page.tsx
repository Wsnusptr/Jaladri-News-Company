// File 3: apps/cms/app/articles/new/page.tsx (Tambah Artikel - Responsif)
// Ganti seluruh isi file ini.
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArticleForm } from '../../../../web/components/shared/ArticleForm';

export default function NewArticlePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState('');

  const handleSubmit = async (data: any, file?: File) => {
    if (!data.title || !data.content || !data.category) {
      setError('Semua field wajib diisi');
      return;
    }

    try {
      // Upload image if provided
      let imageUrl = data.imageUrl;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        // No file size limit enforced here
        const uploadResponse = await fetch('/api/proxy/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error('Gagal mengunggah gambar');
        }
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      }

      // Determine status: admin = PUBLISHED, user = DRAFT
      const isAdmin = (session?.user as any)?.role === 'ADMIN';
      const status = isAdmin ? 'PUBLISHED' : 'DRAFT';
      const endpoint = isAdmin ? '/api/proxy/articles' : '/api/proxy/articles/draft';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imageUrl,
          status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Gagal membuat artikel');
      }

      alert(isAdmin ? 'Artikel berhasil dipublikasikan!' : 'Artikel berhasil dibuat sebagai draft!');
      router.push(isAdmin ? '/articles' : '/drafts');
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan artikel');
      console.error('Error submitting article:', err);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tambah Artikel Baru</h1>
        <Link href="/articles" className="text-sm text-blue-600 hover:underline">&larr; Kembali</Link>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <ArticleForm onSubmit={handleSubmit} buttonText={(session?.user as any)?.role === 'ADMIN' ? 'Publikasikan Artikel' : 'Simpan sebagai Draft'} />
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
    </div>
  );
}