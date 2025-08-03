
"use client";

import { useState, useEffect } from 'react';
import { ThemeToggle } from '../shared/ThemeToggle';
import { motion } from 'framer-motion';
import { Search, X, TrendingUp, Calendar, BookmarkPlus, Bell, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Category {
  name: string;
  slug: string;
  count?: number;
}

interface SidebarProps {
  categories: Category[];
  popularTags?: string[];
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  categories = [], 
  popularTags = [], 
  isOpen = false, 
  onClose 
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { opacity: 0, x: -20, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariant = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 right-0 bottom-0 w-full sm:w-[350px] bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-5">
          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Navigation */}
          <motion.nav 
            initial="closed"
            animate="open"
            variants={itemVariants}
            className="mb-6"
          >
            <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">Navigation</h3>
            <ul className="space-y-1">
              <motion.li variants={itemVariant}>
                <Link 
                  href="/" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span>Home</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
              <motion.li variants={itemVariant}>
                <Link 
                  href="/trending" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                    Trending
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
              <motion.li variants={itemVariant}>
                <Link 
                  href="/latest" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-500" />
                    Latest News
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
              <motion.li variants={itemVariant}>
                <Link 
                  href="/bookmarks" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="flex items-center">
                    <BookmarkPlus className="h-4 w-4 mr-2 text-purple-500" />
                    Saved Articles
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
              <motion.li variants={itemVariant}>
                <Link 
                  href="/notifications" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-yellow-500" />
                    Notifications
                    <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
              <motion.li variants={itemVariant}>
                <Link 
                  href="/profile" 
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-cyan-500" />
                    My Profile
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </motion.li>
            </ul>
          </motion.nav>

          {/* Categories */}
          <motion.div 
            initial="closed"
            animate="open"
            variants={itemVariants}
            className="mb-6"
          >
            <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <motion.div key={category.slug} variants={itemVariant}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  >
                    <span>{category.name}</span>
                    {category.count !== undefined && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                        {category.count}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Popular Tags */}
          {popularTags.length > 0 && (
            <motion.div 
              initial="closed"
              animate="open"
              variants={itemVariants}
              className="mb-6"
            >
              <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <motion.div key={tag} variants={itemVariant}>
                    <Link
                      href={`/tag/${tag}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full transition-colors"
                    >
                      #{tag}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Theme toggle */}
          <motion.div 
            initial="closed"
            animate="open"
            variants={itemVariants}
            className="mb-6 pt-6 border-t border-gray-200 dark:border-gray-800"
          >
            <motion.div variants={itemVariant} className="flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Theme</h3>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
