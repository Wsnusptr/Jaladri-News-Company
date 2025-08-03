// apps/web/components/articles/VideoCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';
import { Video } from '@/lib/article-data';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={video.url} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <Image
          src={video.imageUrl}
          alt={video.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay ikon play di tengah */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>
        {/* Overlay durasi */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{video.duration}</span>
        </div>
      </div>
      <h3 className="mt-3 text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
        {video.title}
      </h3>
    </Link>
  );
}