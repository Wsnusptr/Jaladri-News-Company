// apps/web/components/articles/HeroSection.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/article-data';

interface HeroSectionProps {
  article: Article;
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
      <Link href={article.url} className="group relative block w-full h-96">
        {/* Gambar Latar */}
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          priority // Prioritaskan loading gambar ini karena paling atas
        />
        {/* Overlay Gradien */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Konten Teks */}
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <span className={`text-sm font-bold uppercase ${article.categoryColor}`}>{article.category}</span>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight group-hover:underline">
            {article.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}