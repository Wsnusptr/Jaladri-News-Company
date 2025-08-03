'use client';

import Image from 'next/image';
import Link from 'next/link';
import { topAdConfig } from '@/lib/ad-config';

interface TopAdBannerProps {
  imageUrl?: string;
  linkUrl?: string;
  altText?: string;
  sponsor?: string;
}

export function TopAdBanner({
  imageUrl = topAdConfig.imageUrl,
  linkUrl = topAdConfig.linkUrl,
  altText = topAdConfig.altText,
  sponsor = topAdConfig.sponsor
}: TopAdBannerProps) {
  return (
    <div className="bg-white py-2 border-b">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-end gap-3">
          <div>
            <h2 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-700 via-red-500 to-orange-400 bg-clip-text text-transparent">
                Jaladri news
              </span>
            </h2>
          </div>
        </div>

        {/* Iklan Banner - Dapat diedit sewaktu-waktu */}
        <div className="hidden md:block">
          <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-md px-4 py-2 text-center hover:from-blue-100 hover:to-blue-150 transition-all">
              <p className="text-xs text-gray-500 mb-1">Advertisement</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-800">Sponsored by {sponsor}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}