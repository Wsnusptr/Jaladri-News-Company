'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePopupAd } from '../../hooks/usePopupAd';

interface PopupAdProps {
  delayMs?: number;
  autoClose?: number;
  repeatInterval?: number;
}

import { AdContent, premiumAdContent } from '../../lib/ad-content';
// Default ad content is imported from topup-ad-content.ts

export function PopupAd({ delayMs = 2000, autoClose, repeatInterval = 300000 }: PopupAdProps) {
  const [adContent, setAdContent] = useState<AdContent>(premiumAdContent);
  
  // Use our custom hook to manage popup state
  const { isVisible, hideAd } = usePopupAd({
    delayMs,
    autoClose,
    repeatInterval
  });
  
  const handleClose = () => {
    hideAd();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Popup - Improved centering for all devices */}
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-gray-200 z-10 shadow-sm"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
            
            {/* Ad content */}
            <div className="relative">
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image 
                  src={adContent.imageUrl}
                  alt={adContent.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{adContent.title}</h3>
                <p className="text-gray-600 mb-4">{adContent.description}</p>
                
                <Link 
                  href={adContent.ctaLink}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white 
                            font-bold py-2 px-6 rounded-full transition-colors shadow-md"
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
                    Tutup
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}