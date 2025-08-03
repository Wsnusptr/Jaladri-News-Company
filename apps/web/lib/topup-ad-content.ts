// apps/web/lib/topup-ad-content.ts

export interface AdContent {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  sponsor: string;
}

export const topupAdContent: AdContent = {
  title: 'Dapatkan Bonus Topup hingga 15%',
  description: 'Khusus hari ini! Topup saldo Anda dan dapatkan bonus hingga 15% untuk setiap transaksi. Promo berlaku hingga akhir bulan.',
  imageUrl: 'https://picsum.photos/seed/topup/400/300',
  ctaText: 'Lihat Detail Promo',
  ctaLink: '/topup/promo',
  sponsor: 'Jaladri Payment'
};

export const premiumAdContent: AdContent = {
  title: 'Bergabunglah dengan MPC Premium',
  description: 'Dapatkan akses eksklusif ke berita terdepan, analisis mendalam, dan konten premium lainnya. Mulai dari Rp 29.000/bulan.',
  imageUrl: 'https://picsum.photos/seed/premium/400/300',
  ctaText: 'Daftar Sekarang',
  ctaLink: '/premium',
  sponsor: 'MPC Premium'
};