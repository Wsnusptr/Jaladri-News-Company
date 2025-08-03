// apps/web/components/articles/NetworkCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { NetworkArticle } from '@/lib/article-data';

interface NetworkCardProps {
  article: NetworkArticle;
}

export function NetworkCard({ article }: NetworkCardProps) {
  return (
    <Link href={article.url} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Logo Network di atas kanan */}
        <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-md">
          <Image
            src={article.network.logoUrl}
            alt={article.network.name}
            width={40} // Ukuran logo bisa disesuaikan
            height={20}
            className="object-contain h-4 w-auto"
          />
        </div>
      </div>
      <h3 className="mt-3 text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      <p className="mt-1 text-xs text-gray-500">{article.timestamp}</p>
    </Link>
  );
}