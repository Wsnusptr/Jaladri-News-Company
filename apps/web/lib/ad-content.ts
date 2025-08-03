// apps/web/lib/ad-content.ts
// pop up

export interface AdContent {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  sponsor: string;
}

export const premiumAdContent: AdContent = {
  title: 'Bergabunglah dengan MPC Premium',
  description: 'Dapatkan akses eksklusif ke berita terdepan, analisis mendalam, dan konten premium lainnya. Mulai dari Rp 29.000/bulan.',
  imageUrl: 'https://picsum.photos/seed/premium/400/300',
  ctaText: 'Daftar Sekarang',
  ctaLink: '/premium',
  sponsor: 'MPC Premium'
};

