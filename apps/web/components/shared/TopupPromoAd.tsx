'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Percent } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePopupAd } from '@/hooks/usePopupAd';
import { topupAdContent } from '@/lib/topup-ad-content';

interface TopupPromoAdProps {
  delayMs?: number;
  storageKey?: string;
  autoClose?: number;
}

export function TopupPromoAd({ 
  delayMs = 500, 
  storageKey = 'topup_promo_closed', 
  autoClose 
}: TopupPromoAdProps) {
  const [adContent] = useState(topupAdContent);
  
  // Use our custom hook to manage popup state
  const { isVisible, hideAd } = usePopupAd({
    delayMs,
    storageKey,
    autoClose
  });
  
  const handleClose = () => {
    hideAd(true); // true means remember this choice
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 
                      w-[90%] max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-gray-200 z-10"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
            
            {/* Ad content - Special topup promo styling */}
            <div className="relative">
              {/* Image with overlay */}
              <div className="relative h-48 w-full">
                <Image 
                  src={adContent.imageUrl}
                  alt={adContent.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Promo badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
                  <Percent size={16} className="mr-1" />
                  <span className="font-bold">PROMO</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{adContent.title}</h3>
                <p className="text-gray-600 mb-4">{adContent.description}</p>
                
                <Link 
                  href={adContent.ctaLink}
                  className="inline-flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white 
                            font-bold py-3 px-6 rounded-full transition-colors shadow-md"
                >
                  {adContent.ctaText}
                  <ExternalLink size={16} />
                </Link>
                
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Sponsored by {adContent.sponsor}
                  </span>
                  <button 
                    onClick={handleClose}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Jangan tampilkan lagi
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}