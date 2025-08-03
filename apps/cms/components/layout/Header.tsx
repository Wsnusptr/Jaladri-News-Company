"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserMenu } from '@/components/auth/UserMenu';
import { useSession } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-30 transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/30 dark:border-gray-700/30'
        }
      `}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">JALADRI</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {session?.user && (
              <UserMenu />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}