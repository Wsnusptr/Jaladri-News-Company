// apps/web/components/layout/TertiaryNavbar.tsx
"use client";

import Link from 'next/link';
import { tertiaryNavLinks } from '@/lib/nav-data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Impor Autoplay
import 'swiper/css';

export function TertiaryNavbar() {
    return (
        <nav className="bg-gray-100 border-b">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Autoplay]} // Tambahkan Autoplay
                    slidesPerView={'auto'}
                    centeredSlides={true} // Buat slide berada di tengah
                    spaceBetween={28}
                    loop={true} // Aktifkan loop
                    autoplay={{
                      delay: 3500, // Gunakan durasi berbeda agar tidak monoton
                      disableOnInteraction: false,
                    }}
                    speed={1500}
                    className="py-2"
                >
                    {tertiaryNavLinks.map((item) => (
                        <SwiperSlide key={item.label} className="!w-auto">
                            <div className="relative">
                                <Link href={item.href} className="block text-sm text-gray-700 font-medium whitespace-nowrap hover:text-blue-800">
                                    {item.label}
                                </Link>
                                {item.hasIndicator && (
                                    <span className="absolute top-0 right-[-8px] w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </nav>
    );
}