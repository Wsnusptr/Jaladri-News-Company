
"use client";

import { useState, useEffect } from 'react';
import { Article } from '@/lib/article-data';
import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, TrendingUp, Clock, Award, Flame } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  categories: string[];
}

export function NewsGrid({ articles, categories = [] }: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState<'latest' | 'trending' | 'popular'>('latest');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort articles
  useEffect(() => {
    let results = [...articles];

    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(article => 
        article.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(article => 
        article.title.toLowerCase().includes(term) || 
        article.excerpt?.toLowerCase().includes(term) ||
        article.content?.toLowerCase().includes(term)
      );
    }

    // Sort articles
    results = results.sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else if (sortOrder === 'trending') {
        return (b.trendingScore || 0) - (a.trendingScore || 0);
      } else {
        return (b.viewCount || 0) - (a.viewCount || 0);
      }
    });

    setFilteredArticles(results);
  }, [articles, activeCategory, sortOrder, searchTerm]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 theme-transition">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative inline-block">
              <select 
                className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="popular">Most Popular</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex h-12 items-center justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <TabsTrigger 
                value="all" 
                className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md data-[state=active]:shadow-sm"
              >
                All
              </TabsTrigger>

              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category.toLowerCase()}
                  className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md data-[state=active]:shadow-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700">
              <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredArticles.map((article) => (
              <motion.div key={article.id} variants={item} className="hover-lift">
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredArticles.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
