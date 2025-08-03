// apps/web/components/shared/ArticleImage.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ensureValidImageUrl, PLACEHOLDER_IMAGE } from '@/lib/image-fix';

interface ArticleImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function ArticleImage({
  src,
  alt = "Article image",
  width,
  height,
  fill = false,
  className = "",
  priority = false
}: ArticleImageProps) {
  // Always provide a valid src to avoid the ReactDOM.preload warning
  const validSrc = ensureValidImageUrl(src);

  // Track loading state for fade-in effect
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle image error
  const [imgSrc, setImgSrc] = useState(validSrc);
  const handleError = () => {
    setImgSrc(PLACEHOLDER_IMAGE);
  };

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : (width || 600)}
        height={fill ? undefined : (height || 400)}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        priority={priority}
      />
    </div>
  );
}
