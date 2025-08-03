import { getArticles } from '@repo/db';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Users, Clock } from 'lucide-react';

const categories = [
  { 
    name: 'Olahraga', 
    slug: 'olahraga', 
    color: 'from-green-500 to-green-600',
    icon: '⚽',
    description: 'Berita terkini seputar dunia olahraga'
  },
  { 
    name: 'Politik', 
    slug: 'politik', 
    color: 'from-red-500 to-red-600',
    icon: '🏛️',
    description: 'Perkembangan politik dan pemerintahan'
  },
  { 
    name: 'Teknologi', 
    slug: 'teknologi', 
    color: 'from-blue-500 to-blue-600',
    icon: '💻',
    description: 'Inovasi dan perkembangan teknologi'
  },
  { 
    name: 'Kesehatan', 
    slug: 'kesehatan', 
    color: 'from-purple-500 to-purple-600',
    icon: '🏥',
    description: 'Tips kesehatan dan informasi medis'
  },
  { 
    name: 'Ekonomi', 
    slug: 'ekonomi', 
    color: 'from-yellow-500 to-yellow-600',
    icon: '💰',
    description: 'Berita bisnis dan ekonomi terkini'
  },
  { 
    name: 'Hiburan', 
    slug: 'hiburan', 
    color: 'from-pink-500 to-pink-600',
    icon: '🎬',
    description: 'Dunia entertainment dan selebriti'
  },
  { 
    name: 'Lifestyle', 
    slug: 'lifestyle', 
    color: 'from-orange-500 to-orange-600',
    icon: '✨',
    description: 'Gaya hidup dan tips kehidupan'
  },
  { 
    name: 'Video News', 
    slug: 'video', 
    color: 'from-indigo-500 to-indigo-600',
    icon: '📹',
    description: 'Berita dalam format video'
  }
];

export default async function CategoriesPage() {
  // Get latest articles for each category
  const allArticles = await getArticles({ status: 'PUBLISHED', includeAuthor: true });
  
  // Calculate stats for each category
  const categoryStats = categories.map(category => {
    const categoryArticles = allArticles.filter(article => 
      article.categories.some(cat => 
        cat.name.toLowerCase().includes(category.slug) ||
        cat.slug.toLowerCase().includes(category.slug)
      )
    );
    
    return {
      ...category,
      articleCount: categoryArticles.length,
      latestArticle: categoryArticles[0] || null
    };
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kategori Berita
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Jelajahi berita berdasarkan kategori yang Anda minati
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>{allArticles.length} Total Artikel</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{categories.length} Kategori</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryStats.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Kategori Unggulan
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categoryStats.slice(0, 2).map((category) => (
              <FeaturedCategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/kategori/${category.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-600 transition-all duration-300 overflow-hidden">
        <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
          <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>{category.articleCount} artikel</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Featured Category Card Component
function FeaturedCategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/kategori/${category.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-600 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className={`md:w-1/3 h-48 md:h-auto bg-gradient-to-br ${category.color} flex items-center justify-center relative`}>
            <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {category.description}
            </p>
            
            {category.latestArticle && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Artikel Terbaru:</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {category.latestArticle.title}
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{category.articleCount} artikel</span>
                </div>
                {category.latestArticle && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(category.latestArticle.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: 'Kategori Berita - Jaladri News',
  description: 'Jelajahi berita berdasarkan kategori yang Anda minati di Jaladri News',
};
