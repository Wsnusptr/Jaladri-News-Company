// apps/web/components/articles/ArticleCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { NetworkCard } from './NetworkCard';
import { NetworkArticle } from '@/lib/article-data';

import 'swiper/css';
import 'swiper/css/navigation';

interface ArticleCarouselProps {
  articles: NetworkArticle[];
}

export function ArticleCarousel({ articles }: ArticleCarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1.5}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 2.5,
        },
        1024: {
          slidesPerView: 3.5,
        },
      }}
      className="!p-1"
    >
      {articles.map((article) => (
        <SwiperSlide key={article.id}>
          <NetworkCard article={article} />
        </SwiperSlide> 
      ))}
    </Swiper>
  );
}