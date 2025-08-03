// apps/web/components/widgets/PopularNewsWidget.tsx
import Link from 'next/link';
import { getHotNewsArticles } from '@repo/db';

type PopularNewsItem = {
  id: string;
  title: string;
  category: string;
  createdAt: Date;
  author?: {
    name: string | null;
  } | null;
};

export async function PopularNewsWidget() {
  try {
    const articles = await getHotNewsArticles();

    if (!articles || articles.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Berita Terpopuler</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">Tidak ada berita populer saat ini.</p>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Berita Terpopuler</h2>
        </div>
        <ul>
          {articles.map((item, index) => (
            <li key={item.id} className="flex items-start space-x-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">#{index + 1}</span>
              <div>
                <Link href={`/news/${item.id}`} className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.title}
                </Link>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{item.category || 'Unknown'}</span>
                  <span className="mx-1">|</span>
                  <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="pt-4 text-center">
           <Link href="/terpopuler" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Lihat Selengkapnya →
           </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in PopularNewsWidget:', error);
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Berita Terpopuler</h2>
        </div>
        <p className="text-red-500 dark:text-red-400 text-center py-4">Gagal memuat berita populer.</p>
      </div>
    );
  }
}
