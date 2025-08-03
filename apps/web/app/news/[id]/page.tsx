// Impor fungsi dari package database kita, bukan dari mock data
import { getArticleById, getArticles } from '@repo/db';
import { notFound } from 'next/navigation';
import { ArticleView } from '@/components/articles/ArticleView';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  // Await params untuk Next.js 15 compatibility
  const { id } = await params;
  const article = await getArticleById(id);

  // Jika tidak ditemukan di database, tampilkan 404
  if (!article) {
    notFound();
  }

  // Ambil artikel lain untuk "Berita Terkait" dari database.
  // Catatan: Mengambil semua artikel (`getArticles()`) sangat tidak efisien.
  // Sebaiknya, modifikasi `getArticles` untuk menerima limit atau buat fungsi baru
  // seperti `getRelatedArticles` yang mengambil artikel berdasarkan kategori atau tag.
  const allArticles = await getArticles({ status: 'PUBLISHED', includeAuthor: true }); // Ambil artikel yang dipublikasikan
  const relatedArticles = allArticles
    // Saring agar tidak menampilkan artikel yang sedang dibaca
    .filter((a) => a.id !== article.id)
    // Ambil 3 artikel pertama
    .slice(0, 3)
    // Proses data agar cocok dengan properti yang dibutuhkan komponen ArticleCard
    .map(a => ({
      ...a,
      url: `/news/${a.id}`,
      timestamp: new Date(a.createdAt).toLocaleDateString('id-ID'), // Ensure timestamp is a string
      category: a.categories[0]?.name || 'Umum', // Ensure category is a string
    }));

  return <ArticleView article={article} relatedArticles={relatedArticles as any} />;
}
