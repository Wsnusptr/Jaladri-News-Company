'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';
import { secondaryAdConfig } from '@/lib/ad-config';

interface AboveSubNavAdProps {
  imageUrl?: string;
  linkUrl?: string;
  altText?: string;
  sponsor?: string;
  closeable?: boolean;
}

export function AboveSubNavAd({
  imageUrl = secondaryAdConfig.imageUrl,
  linkUrl = secondaryAdConfig.linkUrl,
  altText = secondaryAdConfig.altText,
  sponsor = secondaryAdConfig.sponsor,
  closeable = true
}: AboveSubNavAdProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 py-2 border-b">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Tombol Close */}
          {closeable && (
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-50 transition-colors"
              aria-label="Close advertisement"
            >
              <X size={14} />
            </button>
          )}
          
          <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image 
                      src={imageUrl}
                      alt={altText}
                      fill
                      className="object-cover rounded"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Advertisement</p>
                    <p className="text-sm font-medium text-blue-800">
                      {sponsor} - Special Offer
                    </p>
                  </div>
                </div>
                <div className="hidden md:block bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                  Learn More
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}