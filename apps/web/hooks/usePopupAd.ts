'use client';

import { useState, useEffect } from 'react';

interface UsePopupAdOptions {
  delayMs?: number;
  storageKey?: string;
  autoClose?: number;
  initiallyShown?: boolean;
  repeatInterval?: number; // Interval to show popup again in milliseconds
}

export function usePopupAd({
  delayMs = 2000,
  storageKey = 'popup_ad_closed',
  autoClose,
  initiallyShown = false,
  repeatInterval = 300000, // Default: 5 minutes (300,000ms)
}: UsePopupAdOptions = {}) {
  const [isVisible, setIsVisible] = useState(initiallyShown);
  
  useEffect(() => {
    // Show popup after initial delay
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    
    // Auto close if specified
    let closeTimer: NodeJS.Timeout | null = null;
    if (autoClose) {
      closeTimer = setTimeout(() => {
        setIsVisible(false);
      }, delayMs + autoClose);
    }
    
    // Set up repeating interval to show popup again
    const repeatTimer = setInterval(() => {
      setIsVisible(true);
    }, repeatInterval);
    
    return () => {
      clearTimeout(initialTimer);
      if (closeTimer) clearTimeout(closeTimer);
      clearInterval(repeatTimer);
    };
  }, [delayMs, autoClose, repeatInterval]);

  const showAd = () => setIsVisible(true);
  
  const hideAd = () => {
    setIsVisible(false);
  };
  
  const resetAdState = () => {
    // No longer needed since we're not using localStorage
  };

  return {
    isVisible,
    showAd,
    hideAd,
    resetAdState
  };
}