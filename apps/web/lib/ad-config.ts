// apps/web/lib/ad-config.ts

export interface AdConfig {
  imageUrl: string;
  videoUrl?: string;
  linkUrl: string;
  altText: string;
  sponsor: string;
}

// Top banner ad configuration (above SubNavbar)
// IKLAN ATAS - Di atas SubNavbar (Dapat diedit sewaktu-waktu)
export const topAdConfig: AdConfig = {
  imageUrl: '/logo.png',
  linkUrl: 'https://jaladri.com/promo',
  altText: 'Jaladri News Logo',
  sponsor: 'Jaladri Partners'
};

// Main banner ad configuration (between SubNavbar and HeroSection)
// IKLAN UTAMA - Di bawah SubNavbar (Dapat diedit sewaktu-waktu)
export const mainAdConfig: AdConfig = {
  imageUrl: '/iklan.png',
  videoUrl: 'https://example.com/ad-video.mp4',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  linkUrl: 'https://jaladri.com/special-offer',
  altText: 'Special Promotion',
  sponsor: 'Jaladri Sponsors'
};

// Secondary banner ad configuration (used above SubNavbar)
export const secondaryAdConfig: AdConfig = {
  imageUrl: '/iklan1.png',
  videoUrl: 'https://example.com/ad-video2.mp4',
  linkUrl: 'https://jaladri.com/event',
  altText: 'Upcoming Event',
  sponsor: 'Jaladri Events'
};