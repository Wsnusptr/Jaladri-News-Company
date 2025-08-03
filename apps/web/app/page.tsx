// apps/web/app/page.tsx
import { SubNavbar } from '@/components/layout/SubNavbar';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { PopularNewsWidget } from '@/components/widgets/PopularNewsWidget';
import PopularTagsMockup from '@/components/widgets/PopularTagsMockup';
import { HeroSection } from '@/components/articles/HeroSection';
import { VideoCard } from '@/components/articles/VideoCard';
import { ArticleCarousel } from '@/components/articles/ArticleCarousel';
import { NetworkCard } from '@/components/articles/NetworkCard';
import { FeaturedStripCarousel } from '@/components/articles/FeaturedStripCarousel';
import { HotNewsSlider } from '@/components/widgets/HotNewsSlider';
import { getArticles, getHotNewsArticles, getSliderArticles, getRecommendationArticles, Prisma } from '@repo/db';

// Type definition for articles with included relations
type ArticleWithRelations = Prisma.ArticleGetPayload<{
  include: {
    author: true;
    categories: true;
  };
}>;
// Helper untuk menambahkan properti frontend
const processArticles = (articles: ArticleWithRelations[]) => {
  return articles.map(article => {    // Ambil kategori pertama jika ada, atau gunakan default
    const categoryName = article.categories && article.categories.length > 0
      ? article.categories[0].name
      : 'Berita';


    return {
      ...article,
      url: `/news/${article.id}`,
      timestamp: new Date(article.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long' }),
      categoryNameColor: 'text-blue-600',
      categoryColor: 'text-blue-600', // Add missing categoryColor property
      category: categoryName, // Tambahkan untuk backward compatibility
      network: { name: categoryName, logoUrl: `https://logo.clearbit.com/${categoryName.toLowerCase()}.com` }
    };
  });
};

export default async function HomePage() {
  // Ambil semua jenis data dari database secara bersamaan
  let mainArticles: ArticleWithRelations[] = [];
  let videoArticles: ArticleWithRelations[] = [];
  let lifestyleArticles: ArticleWithRelations[] = [];
  let networkArticles: ArticleWithRelations[] = [];
  let hotNewsArticles: ArticleWithRelations[] = [];
  let sliderArticles: ArticleWithRelations[] = [];
  let recommendationArticles: ArticleWithRelations[] = [];

  try {
    [mainArticles, videoArticles, lifestyleArticles, networkArticles, hotNewsArticles, sliderArticles, recommendationArticles] = await Promise.all([
      getArticles({ type: 'STANDARD' }),
      getArticles({ type: 'VIDEO' }),
      getArticles({ type: 'LIFESTYLE' }),
      getArticles({ type: 'JALADRI_NETWORK' }),
      getHotNewsArticles(),
      getSliderArticles(),
      getRecommendationArticles()
    ]);
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Jika terjadi error, gunakan data kosong
  }

  const processedMain = processArticles(mainArticles || []);
  const processedVideos = processArticles(videoArticles || []);
  const processedLifestyle = processArticles(lifestyleArticles || []);
  const processedNetwork = processArticles(networkArticles || []);
  const processedHotNews = processArticles(hotNewsArticles || []);
  const processedSlider = processArticles(sliderArticles || []);
  const processedRecommendations = processArticles(recommendationArticles || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="container mx-auto px-4 lg:px-6 py-6">

        {/* Sub Navigation */}
        <div className="mb-8 animate-fade-in">
          <SubNavbar />
        </div>

        {/* Hero Section */}
        {processedMain.length > 0 && (
          <div className="mb-12 animate-slide-up">
            <HeroSection article={processedMain[0]} />
          </div>
        )}

        {/* Featured Strip Carousel */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {processedSlider.length > 0 ? (
            <FeaturedStripCarousel items={processedSlider as any} />
          ) : (
            <FeaturedStripCarousel items={processedLifestyle as any} />
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Hot News Section */}
            {processedHotNews.length > 0 && (
              <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    🔥 Hot News
                  </h2>
                </div>
                <div className="glass-card p-6 border-l-4 border-red-500">
                  <HotNewsSlider articles={processedHotNews as any} />
                </div>
              </section>
            )}

            {/* Main News Section */}
            <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-edge-500 to-edge-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Berita Utama</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processedMain.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-scale-in hover-lift"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <ArticleCard article={article as any} />
                  </div>
                ))}
              </div>
            </section>

            {/* Video Section */}
            <section className="animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Terpopuler</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="animate-scale-in hover-lift"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <VideoCard video={video as any} />
                  </div>
                ))}
              </div>
            </section>

            {/* News Feed Section */}
            <section className="animate-slide-up" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">News Feed</h2>
              </div>
              <div className="space-y-4">
                {processedMain.slice(0, 4).map((article, index) => (
                  <div
                    key={`horizontal-${article.id}`}
                    className="animate-slide-left hover-lift"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <ArticleCard article={article as any} variant="horizontal" />
                  </div>
                ))}
              </div>
            </section>

            {/* Lifestyle Section */}
            <section className="animate-slide-up" style={{ animationDelay: '900ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lifestyle Terpopuler</h2>
              </div>
              <ArticleCarousel articles={processedLifestyle as any} />
            </section>

            {/* Network Section */}
            <section className="animate-slide-up" style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">JaladriNetwork</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedNetwork.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-scale-in hover-lift"
                    style={{ animationDelay: `${1100 + index * 100}ms` }}
                  >
                    <NetworkCard article={article as any} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 animate-slide-right" style={{ animationDelay: '1200ms' }}>
            <div className="sticky top-24 space-y-8">
              <PopularNewsWidget />
              <PopularTagsMockup />
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <section className="mt-16 animate-slide-up" style={{ animationDelay: '1300ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rekomendasi untuk Anda</h2>
          </div>
          {processedRecommendations.length > 0 ? (
            <ArticleCarousel articles={processedRecommendations as any} />
          ) : (
            <ArticleCarousel articles={processedLifestyle as any} />
          )}
        </section>
      </div>
    </div>
  );
}
