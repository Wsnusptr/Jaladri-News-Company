// Microsoft Edge-Inspired Header Component
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Sidebar } from './Sidebar';
import { UserMenu } from '@/components/auth/UserMenu';
import { ThemeToggle } from '../shared/ThemeToggle';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarInitialFocusRef = useRef(null);

  // For accessibility: focus the sidebar on open, if focusable section exists inside sidebar
  useEffect(() => {
    if (isSidebarOpen && sidebarInitialFocusRef.current) {
      sidebarInitialFocusRef.current.focus();
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple search submit stub (improve as needed)
  function handleSearchSubmit(e) {
    e.preventDefault();
    // You can replace below with your actual search logic
    alert('Search: ' + searchQuery);
  }

  return (
    <>
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
                  {/* Replace Edge logo with Jaladri logo */}
                  {/* <span className="text-xl font-bold text-blue-600 dark:text-blue-400">JALADRI</span> */}
                  <Image src="/logo.png" alt="Jaladri News Logo" width={40} height={40} />
                </div>
              </Link>
            </div>

            {/* Center: Enhanced Search Bar */}
            <div className="flex-1 flex justify-center px-4 lg:px-8">
              <form
                className="w-full max-w-2xl relative group"
                onSubmit={handleSearchSubmit}
                role="search"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news"
                    className="
                      w-full h-12 pl-5 pr-14 rounded-lg
                      bg-white/80 dark:bg-gray-800/80 backdrop-blur
                      border border-gray-200/50 dark:border-gray-700/50
                      focus:border-blue-500/50 dark:focus:border-blue-400/50
                      focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
                      text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                      transition-all duration-300 ease-in-out
                      hover:bg-white dark:hover:bg-gray-800
                      hover:shadow-md focus:shadow-lg
                      text-sm font-medium
                    "
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="
                      absolute inset-y-0 right-0 flex items-center justify-center w-12
                      bg-gradient-to-r from-blue-500 to-blue-600
                      hover:from-blue-600 hover:to-blue-700
                      rounded-r-lg transition-all duration-300 ease-in-out
                      hover:shadow-md active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-blue-500/20
                      group
                    "
                  >
                    <Search className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Search suggestions overlay (placeholder for future implementation) */}
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-lg z-50">
                    {/* Search suggestions would go here */}
                    <div className="p-4 text-gray-500 text-sm text-center">Search suggestions (coming soon)</div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Side: Notifications, Theme Toggle & User Menu */}
            <div className="flex items-center space-x-3">
              <NotificationCenter />
              <ThemeToggle variant="icon" size="md" />

              <div className="hidden md:block">
                <UserMenu />
              </div>

              {/* Desktop menu button (right, large screens) */}
              <div className="hidden md:block">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="
                    w-10 h-10 flex items-center justify-center
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur
                    border border-gray-200/50 dark:border-gray-700/50
                    rounded-md hover:bg-white dark:hover:bg-gray-800
                    hover:shadow-md transition-all duration-300 ease-in-out
                  "
                  aria-label="Open menu"
                  ref={sidebarInitialFocusRef}
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Mobile menu button (right) */}
              <div className="md:hidden">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="
                    w-10 h-10 flex items-center justify-center
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur
                    border border-gray-200/50 dark:border-gray-700/50
                    rounded-md hover:bg-white dark:hover:bg-gray-800
                    hover:shadow-md transition-all duration-300 ease-in-out
                  "
                  aria-label="Open menu"
                  ref={sidebarInitialFocusRef}
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </header>

      {/* Pass initialFocusRef to Sidebar so that it can receive focus when opened */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} initialFocusRef={sidebarInitialFocusRef} />
    </>
  );
}
