// File 4: apps/cms/app/articles/[id]/edit/page.tsx (Edit Artikel - Responsif)
// Ganti seluruh isi file ini.
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArticleForm } from '../../../../../web/components/shared/ArticleForm';
import { Article } from '@repo/db';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [initialData, setInitialData] = useState<Partial<Article> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/proxy/articles/${id}`);
        if (!response.ok) throw new Error('Artikel tidak ditemukan');
        const article = await response.json();
        setInitialData(article);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/proxy/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Gagal memperbarui artikel');
    }
    alert('Artikel berhasil diperbarui!');
    router.push('/articles');
  };
  
  if (isLoading) return <div className="text-center p-10">Memuat data...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Artikel</h1>
        <Link href="/articles" className="text-sm text-blue-600 hover:underline">&larr; Kembali</Link>
      </div>
      {initialData && (
        <ArticleForm 
          onSubmit={handleSubmit} 
          initialData={initialData} 
          buttonText="Simpan Perubahan" 
        />
      )}
    </div>
  );
}