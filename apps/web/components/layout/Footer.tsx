"use client";

import Link from 'next/link';
import { footerLinkColumns, socialLinks } from '@/lib/footer-data';
import Image from 'next/image';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SocialIcon } from '../shared/SocialIcon';

const LinkColumn = ({ title, links }: { title: string, links: { label: string, href: string }[] }) => (
  <div className="space-y-4">
    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{title}</h3>
    <ul className="space-y-2">
      {links.map(link => (
        <li key={link.label}>
          <Link 
            href={link.href} 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors block"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20">
      {/* Main Footer */}
      <div>
        <div className="container mx-auto px-4 lg:px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
            
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 space-y-8">
              {/* Logo and Brand */}
              <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-4">
                <div className="relative">
                  <div>
                    <Image src="/logo.png" alt="jaladri news logo" width={80} height={80}/>
                  </div>
                  <div/>
                </div>
                <div>
                <h2 className="text-2xl font-extrabold">
                  <span className="bg-gradient-to-r from-blue-700 via-red-500 to-orange-400 bg-clip-text text-transparent">
                    Jaladri news
                  </span>
                </h2>
                </div>
              </div>


              {/* Social Media Links */}
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-center md:text-left">
                  Connect With Us
                </h4>
                <div className="flex space-x-3 justify-center md:justify-start">
                  {socialLinks.map(social => (
                    <Link 
                      key={social.label} 
                      href={social.href} 
                      className="
                        group w-10 h-10 flex items-center justify-center
                        bg-white/50 dark:bg-gray-800/50 backdrop-blur-edge
                        border border-gray-200/50 dark:border-gray-700/50
                        rounded-edge hover:bg-edge-500 dark:hover:bg-edge-500
                        hover:border-edge-500 hover:shadow-edge-md
                        transition-all duration-300 ease-edge
                        hover:scale-110 hover:-translate-y-1
                      "
                      aria-label={social.label}
                    >
                      <SocialIcon 
                        name={social.iconName as any} 
                        className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" 
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="col-span-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6 relative">
                Kategori
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-edge-500 to-edge-600 rounded-full" />
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <ul className="space-y-3">
                  {footerLinkColumns.kategori.slice(0, Math.ceil(footerLinkColumns.kategori.length/2)).map(link => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="
                          text-gray-600 dark:text-gray-300 
                          hover:text-edge-600 dark:hover:text-edge-400 
                          text-sm transition-all duration-300 ease-edge
                          hover:translate-x-1 block
                        "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {footerLinkColumns.kategori.slice(Math.ceil(footerLinkColumns.kategori.length/2)).map(link => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="
                          text-gray-600 dark:text-gray-300 
                          hover:text-edge-600 dark:hover:text-edge-400 
                          text-sm transition-all duration-300 ease-edge
                          hover:translate-x-1 block
                        "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Other Columns */}
            <LinkColumn title="Layanan" links={footerLinkColumns.layanan} />
            <LinkColumn title="Informasi" links={footerLinkColumns.informasi} />
            <LinkColumn title="Edge Network" links={footerLinkColumns.jaringanMedia} />
          </div>

          {/* Bottom Section */}
          <div className="
            flex flex-col md:flex-row items-center justify-between 
            mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50
            text-sm text-gray-600 dark:text-gray-400
          ">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p>
                Jaladri Company {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="hover:text-edge-600 dark:hover:text-edge-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-edge-600 dark:hover:text-edge-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-50
            w-12 h-12 flex items-center justify-center
            bg-edge-500 hover:bg-edge-600 text-white
            rounded-full shadow-edge-lg hover:shadow-edge-xl
            transition-all duration-300 ease-edge
            hover:scale-110 hover:-translate-y-1
            focus:outline-none focus:ring-2 focus:ring-edge-500/20
          "
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}