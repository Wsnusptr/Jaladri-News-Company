
"use client";

import { useEffect, useState } from 'react';
import { Article } from '@/lib/article-data';
import { HotNewsSlider } from '../widgets/HotNewsSlider';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  featuredArticles: Article[];
  headlineArticle?: Article;
}

export function HeroSection({ featuredArticles, headlineArticle }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12 theme-transition">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main headline */}
          <motion.div 
            className="lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            {headlineArticle ? (
              <div className="relative overflow-hidden rounded-xl shadow-lg group h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                {headlineArticle.coverImage && (
                  <img 
                    src={headlineArticle.coverImage} 
                    alt={headlineArticle.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center mb-2">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold uppercase rounded mr-2">Breaking</span>
                    <span className="text-gray-200 text-sm">{new Date(headlineArticle.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 line-clamp-3">
                    {headlineArticle.title}
                  </h1>

                  <p className="text-gray-200 line-clamp-2 mb-4">
                    {headlineArticle.excerpt}
                  </p>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
                      {headlineArticle.author?.avatar ? (
                        <img src={headlineArticle.author.avatar} alt={headlineArticle.author.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-medium">
                          {headlineArticle.author?.name?.charAt(0) || 'A'}
                        </div>
                      )}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {headlineArticle.author?.name || 'Anonymous'}
                    </span>
                  </div>
                </div>

                <a href={`/article/${headlineArticle.slug}`} className="absolute inset-0 z-30">
                  <span className="sr-only">Read article: {headlineArticle.title}</span>
                </a>
              </div>
            ) : (
              <div className="rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse h-[500px]"></div>
            )}
          </motion.div>

          {/* News slider */}
          <motion.div 
            className="lg:col-span-5 xl:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg h-[500px]">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">Hot News</h2>
              </div>

              <HotNewsSlider 
                articles={featuredArticles} 
                variant="large" 
                effect="fade"
                className="h-[420px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
