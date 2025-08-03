'use client'

import Link from 'next/link';
import Image from 'next/image'; 
import { Article } from '@/lib/article-data';
import { motion } from 'framer-motion';
import { Clock, Eye, Share2 } from 'lucide-react';

interface ArticleCardProps {
  article: Partial<Article> & { url?: string; timestamp?: string; categoryColor?: string; };
  variant?: 'vertical' | 'horizontal';
  size?: 'normal' | 'small';
}

export function ArticleCard({ article, variant = 'vertical', size = 'normal' }: ArticleCardProps) {
  const articleUrl = `/news/${article.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.1, 0.9, 0.2, 1] }}
      className="h-full"
    >
      {variant === 'horizontal' ? (
        <Link href={articleUrl} className="group block h-full">
          <article className="
            h-full flex items-center space-x-4 p-4
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-edge
            border border-gray-200/50 dark:border-gray-700/50
            rounded-edge-lg shadow-edge-sm hover:shadow-edge-lg
            transition-all duration-300 ease-edge
            hover:bg-white dark:hover:bg-gray-800
            hover:border-edge-500/30 dark:hover:border-edge-400/30
            hover:-translate-y-1
          ">
            <div className="relative flex-shrink-0 w-32 h-24 rounded-edge overflow-hidden">
              <Image
                src={article.imageUrl || '/placeholder-image.jpg'}
                alt={article.title || 'Article Image'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-edge"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="
                  px-2 py-1 text-xs font-semibold rounded-full
                  bg-edge-500/10 dark:bg-edge-400/10
                  text-edge-600 dark:text-edge-400
                  border border-edge-500/20 dark:border-edge-400/20
                ">
                  {article.category}
                </span>
              </div>
              <h3 className="
                text-base font-semibold leading-tight
                text-gray-900 dark:text-white
                group-hover:text-edge-600 dark:group-hover:text-edge-400
                transition-colors duration-300
                line-clamp-2
              ">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.timestamp}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ) : (
        <Link href={articleUrl} className="group block h-full">
          <article className="
            h-full flex flex-col overflow-hidden
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-edge
            border border-gray-200/50 dark:border-gray-700/50
            rounded-edge-lg shadow-edge-sm hover:shadow-edge-xl
            transition-all duration-300 ease-edge
            hover:bg-white dark:hover:bg-gray-800
            hover:border-edge-500/30 dark:hover:border-edge-400/30
            hover:-translate-y-2
          ">
            <div className="relative overflow-hidden">
              <Image
                src={article.imageUrl || '/placeholder-image.jpg'}
                alt={article.title || 'Article Image'}
                width={400}
                height={225}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-edge"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="
                  px-3 py-1 text-xs font-semibold rounded-full
                  bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                  text-edge-600 dark:text-edge-400
                  border border-white/50 dark:border-gray-700/50
                ">
                  {article.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="
                  w-8 h-8 flex items-center justify-center
                  bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                  border border-white/50 dark:border-gray-700/50
                  rounded-full hover:bg-white dark:hover:bg-gray-900
                  transition-colors duration-200
                ">
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 flex flex-col">
              <h3 className={`
                font-semibold leading-tight flex-1
                text-gray-900 dark:text-white
                group-hover:text-edge-600 dark:group-hover:text-edge-400
                transition-colors duration-300
                ${size === 'small' ? 'text-base line-clamp-2' : 'text-lg line-clamp-3'}
              `}>
                {article.title}
              </h3>

              {size !== 'small' && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {article.content?.substring(0, 100)}...
                </p>
              )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{article.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="w-3 h-3" />
                    <span>1234</span> {/* Ganti Math.random() dengan angka statis */}
                  </div>
                </div>
            </div>
          </article>
        </Link>
      )}
    </motion.div>
  );
}