'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { mainAdConfig } from '@/lib/ad-config';

interface MainAdBannerProps {
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  altText?: string;
  closeable?: boolean;
}

export function MainAdBanner({
  imageUrl = mainAdConfig.imageUrl,
  videoUrl = mainAdConfig.videoUrl,
  linkUrl = mainAdConfig.linkUrl,
  altText = mainAdConfig.altText,
  closeable = true
}: MainAdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-100 py-3 border-b border-t">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Tombol Close */}
          {closeable && (
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-md z-10 hover:bg-gray-50 transition-colors"
              aria-label="Close advertisement"
            >
              <X size={16} />
            </button>
          )}
          
          <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
            {/* 2 GRID: 1 KIRI (Gambar) + 1 KANAN (Video) - Responsif All Device */}
            <div className="grid grid-cols-2 gap-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* KIRI - Gambar */}
              <div className="relative h-16 sm:h-20 md:h-24 lg:h-32">
                <Image 
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Label Iklan */}
                <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                  Iklan
                </div>
              </div>
              
              {/* KANAN - Video */}
              <div className="relative h-16 sm:h-20 md:h-24 lg:h-32 bg-black">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Indicator */}
                <div className="absolute bottom-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
                  LIVE
                </div>
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}