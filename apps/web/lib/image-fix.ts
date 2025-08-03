// apps/web/lib/image-fix.ts
/**
 * This file contains fixes for common image-related issues in Next.js
 */

// Placeholder image to use when an image URL is empty
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="%23888888"%3ENo Image%3C/text%3E%3C/svg%3E';

/**
 * Helper function to ensure an image URL is valid and non-empty
 * This helps prevent the ReactDOM.preload warning
 */
export function ensureValidImageUrl(url?: string): string {
  if (!url || url.trim() === '') {
    return PLACEHOLDER_IMAGE;
  }
  return url;
}

/**
 * Helper function for handling image loading errors
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = event.currentTarget;
  img.src = PLACEHOLDER_IMAGE;
  img.onerror = null; // Prevent infinite error loops
}

/**
 * Image props hook - returns props to help with Next.js Image component
 */
export function useImageProps(url?: string) {
  const validUrl = ensureValidImageUrl(url);

  return {
    src: validUrl,
    onError: handleImageError,
    // Adding a key helps React re-render when the URL changes
    key: validUrl,
  };
}
