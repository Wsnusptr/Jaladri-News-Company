"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Article } from '@/lib/article-data';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface HotNewsSliderProps {
  articles: Article[];
  variant?: 'default' | 'large' | 'compact';
  effect?: 'slide' | 'fade' | 'cube';
  autoplay?: boolean;
  showPagination?: boolean;
  className?: string;
}

export function HotNewsSlider({ 
  articles,
  variant = 'default',
  effect = 'slide',
  autoplay = true,
  showPagination = true,
  className = ''
}: HotNewsSliderProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 text-center">No articles available</p>
      </div>
    );
  }

  // Variant-specific settings
  const slidesPerView = variant === 'compact' ? 2 : variant === 'large' ? 1 : 1;
  const spaceBetween = variant === 'compact' ? 12 : 20;
  const height = variant === 'large' ? 'h-[500px]' : variant === 'compact' ? 'h-[250px]' : 'h-[400px]';

  // Effect-specific modules
  const effectConfig = effect === 'fade' 
    ? { effect: 'fade', fadeEffect: { crossFade: true } }
    : effect === 'cube'
    ? { effect: 'cube', cubeEffect: { shadow: true, slideShadows: true } }
    : {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${height} ${className}`}
    >
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
        pagination={showPagination ? { clickable: true, dynamicBullets: true } : false}
        autoplay={autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false}
        loop={true}
        {...effectConfig}
        className="h-full swiper-improved"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id} className="h-full">
            <div className="h-full transition-transform duration-300 hover:scale-[1.01]">
              <ArticleCard article={article} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
