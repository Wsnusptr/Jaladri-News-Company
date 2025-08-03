"use client";

import Image from 'next/image';
import { RelatedNews } from '@/components/articles/RelatedNews';
import { TopAdBanner } from '@/components/ads/TopAdBanner';
import { MainAdBanner } from '@/components/ads/MainAdBanner';
import PopularTagsMockup from '@/components/widgets/PopularTagsMockup';

// Define types for props for better type safety
type Article = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
};

type RelatedArticle = {
  id:string;
  url: string;
  timestamp: string;
  categoryColor: string;
  title: string;
  imageUrl: string;
};

interface ArticleViewProps {
  article: Article;
  relatedArticles: RelatedArticle[];
}

export function ArticleView({ article, relatedArticles }: ArticleViewProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <TopAdBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Category badge with proper dark mode colors */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-bold uppercase text-white bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full shadow-sm">
              {article.category}
            </span>
          </div>
          
          {/* Article title with proper contrast */}
          <h1 className="text-3xl md:text-4xl font-extrabold my-6 text-gray-900 dark:text-white leading-tight">
            {article.title}
          </h1>
          
          {/* Date with proper dark mode styling */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm md:text-base">
            {new Date(article.createdAt).toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          {/* Hero image with dark mode border */}
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800 border border-gray-200 dark:border-gray-700">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          </div>

          {/* Article content with enhanced dark mode support */}
          <div className="prose prose-lg md:prose-xl max-w-none prose-gray dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-a:text-blue-400 dark:prose-strong:text-white dark:prose-code:text-gray-300 dark:prose-code:bg-gray-800">
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>

          {/* Popular tags with dark mode support */}
          <div className="mb-8">
            <PopularTagsMockup />
          </div>
          
          {/* Ad banner */}
          <div className="mb-12">
            <MainAdBanner />
          </div>
          
          {/* Related news with dark mode support */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <RelatedNews articles={relatedArticles} />
          </div>
        </div>
      </div>
    </div>
  );
}