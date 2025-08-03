import { getArticles } from '@repo/db';
import { notFound } from 'next/navigation';
import { CategoryView } from '@/components/categories/CategoryView';
import { PostType } from '@repo/db';

// Define category mappings
const categoryMappings: Record<string, { title: string; type?: PostType; description: string }> = {
  'olahraga': {
    title: 'Berita Olahraga',
    description: 'Berita terkini seputar dunia olahraga, hasil pertandingan, dan analisis mendalam'
  },
  'politik': {
    title: 'Berita Politik',
    description: 'Perkembangan politik terkini, kebijakan pemerintah, dan analisis politik'
  },
  'teknologi': {
    title: 'Berita Teknologi',
    description: 'Inovasi teknologi terbaru, gadget, dan perkembangan dunia digital'
  },
  'kesehatan': {
    title: 'Berita Kesehatan',
    description: 'Tips kesehatan, perkembangan medis, dan informasi gaya hidup sehat'
  },
  'ekonomi': {
    title: 'Berita Ekonomi',
    description: 'Perkembangan ekonomi, bisnis, keuangan, dan investasi'
  },
  'hiburan': {
    title: 'Berita Hiburan',
    description: 'Berita selebriti, film, musik, dan dunia entertainment'
  },
  'lifestyle': {
    title: 'Lifestyle',
    type: 'LIFESTYLE',
    description: 'Gaya hidup, fashion, kuliner, dan tips kehidupan sehari-hari'
  },
  'jaladri-network': {
    title: 'Jaladri Network',
    type: 'JALADRI_NETWORK',
    description: 'Berita eksklusif dari jaringan Jaladri News'
  },
  'video': {
    title: 'Video News',
    type: 'VIDEO',
    description: 'Berita dalam format video dan multimedia'
  },
  'featured': {
    title: 'Featured News',
    type: 'FEATURED_STRIP',
    description: 'Berita pilihan dan artikel unggulan'
  }
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const { page = '1' } = await searchParams;
  
  // Check if category exists
  const categoryInfo = categoryMappings[category.toLowerCase()];
  if (!categoryInfo) {
    notFound();
  }

  // Fetch articles based on category
  const articles = await getArticles({ 
    status: 'PUBLISHED',
    type: categoryInfo.type,
    includeAuthor: true 
  });

  // If no type specified, filter by category name
  let filteredArticles = articles;
  if (!categoryInfo.type) {
    filteredArticles = articles.filter(article => 
      article.categories.some(cat => 
        cat.name.toLowerCase().includes(category.toLowerCase()) ||
        cat.slug.toLowerCase().includes(category.toLowerCase())
      )
    );
  }

  // Pagination
  const pageNumber = parseInt(page as string) || 1;
  const articlesPerPage = 12;
  const startIndex = (pageNumber - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <CategoryView
      category={categoryInfo}
      articles={paginatedArticles}
      currentPage={pageNumber}
      totalPages={totalPages}
      totalArticles={filteredArticles.length}
    />
  );
}

// Generate static paths for common categories
export async function generateStaticParams() {
  return Object.keys(categoryMappings).map((category) => ({
    category: category,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryInfo = categoryMappings[category.toLowerCase()];
  
  if (!categoryInfo) {
    return {
      title: 'Kategori Tidak Ditemukan',
    };
  }

  return {
    title: `${categoryInfo.title} - Jaladri News`,
    description: categoryInfo.description,
  };
}
