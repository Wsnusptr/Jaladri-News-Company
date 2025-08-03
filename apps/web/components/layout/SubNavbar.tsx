"use client";

import Link from 'next/link';
import { newsCategories } from '@/lib/nav-data';
import { TertiaryNavbar } from './TertiaryNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { TopAdBanner } from '../ads/TopAdBanner';
import { MainAdBanner } from '../ads/MainAdBanner';
import { AboveSubNavAd } from '../ads/AboveSubNavAd';
import { useState } from 'react';

export function SubNavbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      {/* IKLAN ATAS - Di atas SubNavbar */}
      <TopAdBanner />
      
      {/* IKLAN TAMBAHAN - Di atas SubNavbar, di bawah TopAdBanner */}
      <AboveSubNavAd />
      
      {/* MICROSOFT EDGE-INSPIRED SUBNAV */}
      <div className="mb-8">
        <nav className="
          bg-white/80 dark:bg-gray-900/80 backdrop-blur-edge
          border-y border-gray-200/50 dark:border-gray-700/50
          shadow-edge-sm
        ">
          <div className="container mx-auto px-4 lg:px-6">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={'auto'}
              spaceBetween={0}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              speed={2000}
              className="py-3"
            >
              {newsCategories.map((item, index) => (
                <SwiperSlide key={item.label} className="!w-auto">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setActiveCategory(item.label)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className={`
                      relative block px-4 py-2 mx-1 rounded-edge text-sm font-semibold
                      whitespace-nowrap transition-all duration-300 ease-edge
                      ${activeCategory === item.label
                        ? 'bg-edge-500 text-white shadow-edge-md scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:text-edge-600 dark:hover:text-edge-400 hover:bg-edge-50 dark:hover:bg-edge-900/20'
                      }
                      focus:outline-none focus:ring-2 focus:ring-edge-500/20
                    `}
                  >
                    {item.label}
                    
                    {/* Animated underline */}
                    <div className={`
                      absolute bottom-0 left-1/2 h-0.5 bg-edge-500
                      transition-all duration-300 ease-edge
                      ${activeCategory === item.label ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'}
                    `} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Subtle gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edge-500/30 to-transparent" />
        </nav>
        
        <TertiaryNavbar />
      </div>
      
      {/* IKLAN UTAMA - Di bawah SubNavbar, sebelum HeroSection */}
      <MainAdBanner />
    </>
  );
}