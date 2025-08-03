// apps/web/components/articles/StripCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { FeaturedStripItem } from '@/lib/article-data';

interface StripCardProps {
  item: FeaturedStripItem;
}

export function StripCard({ item }: StripCardProps) {
  return (
    <Link href={item.url} className="group block text-center">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={300}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h4 className="mt-2 text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        {item.title}
      </h4>
    </Link>
  );
}