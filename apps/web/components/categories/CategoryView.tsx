"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react';
import { JaladriLoader } from '@/components/shared/JaladriLoader';

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  categories: Array<{ name: string; slug: string }>;
  author?: { name: string } | null;
}

interface CategoryInfo {
  title: string;
  description: string;
  type?: string;
}

interface CategoryViewProps {
  category: CategoryInfo;
  articles: Article[];
  currentPage: number;
  totalPages: number;
  totalArticles: number;
}

export function CategoryView({ 
  category, 
  articles, 
  currentPage, 
  totalPages, 
  totalArticles 
}: CategoryViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  const handlePageChange = (page: number) => {
    setLoading(true);
    window.location.href = `?page=${page}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <JaladriLoader size="md" subtext="Loading articles..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-700 dark:to-red-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              {category.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {totalArticles} artikel
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Menampilkan {articles.length} dari {totalArticles} artikel
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tampilan:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Articles Grid/List */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Belum ada artikel
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Artikel untuk kategori ini sedang dalam persiapan
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
          }>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article, viewMode }: { article: Article; viewMode: 'grid' | 'list' }) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/news/${article.id}`}>
        <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-600 transition-all duration-200">
          <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {article.categories.map((cat) => (
                <span
                  key={cat.slug}
                  className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {article.content.substring(0, 150)}...
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
              <span>{article.author?.name || 'Admin'}</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-600 transition-all duration-200 overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {article.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.slug}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
            {article.content.substring(0, 120)}...
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>{article.author?.name || 'Admin'}</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
