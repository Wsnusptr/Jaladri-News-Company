// apps/web/components/articles/FeaturedStripCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { StripCard } from './StripCard';
import { FeaturedStripItem } from '@/lib/article-data';

import 'swiper/css';

interface FeaturedStripCarouselProps {
  items: FeaturedStripItem[];
}

export function FeaturedStripCarousel({ items }: FeaturedStripCarouselProps) {
  return (
    <div className="py-6">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2.5} // Tampilan default di layar kecil
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          // Aturan untuk 5 kolom di layar besar
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <StripCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}