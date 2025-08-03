// Microsoft Edge-Inspired Sidebar Component

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Settings, LogOut, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NavLink, mainLinks, newsCategories, regionalNews, services, network, authLinks } from '@/lib/nav-data';
import { Button } from 'ui';
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from '../shared/ThemeToggle';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavSection = ({ title, links, onLinkClick }: { title: string; links: NavLink[]; onLinkClick: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      {title && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            w-full flex items-center justify-between px-4 py-2 mb-3
            text-left font-semibold text-gray-900 dark:text-white
            hover:bg-gray-100/50 dark:hover:bg-gray-700/50
            rounded-edge transition-all duration-300 ease-edge
          "
        >
          <span className="text-sm uppercase tracking-wide">{title}</span>
          <ChevronRight 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </button>
      )}
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.1, 0.9, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-1">
              {links.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={onLinkClick}
                  className="
                    group flex items-center px-4 py-3 rounded-edge
                    hover:bg-white/50 dark:hover:bg-gray-800/50
                    hover:shadow-edge-sm hover:border-edge-500/20
                    border border-transparent
                    transition-all duration-300 ease-edge
                    hover:translate-x-1
                  "
                >
                  <link.icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-edge-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white flex-1">
                    {link.label}
                  </span>
                  {link.isNew && (
                    <span className="
                      ml-auto text-xs font-bold px-2 py-0.5 rounded-full
                      bg-gradient-to-r from-red-500 to-orange-500 text-white
                      shadow-sm animate-pulse
                    ">
                      NEW
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-edge-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && session?.user;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="
              fixed top-0 left-0 h-full w-full max-w-sm z-50 overflow-y-auto
              bg-white/95 dark:bg-gray-900/95 backdrop-blur-edge
              border-r border-gray-200/50 dark:border-gray-700/50
              shadow-edge-xl
            "
          >
            {/* Header */}
            <div className="
              flex items-center justify-between p-6
              border-b border-gray-200/50 dark:border-gray-700/50
              bg-white/80 dark:bg-gray-900/80 backdrop-blur-edge
            ">
              <div className="flex items-center gap-3">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-edge" 
                />
              </div>
              
              <div className="flex items-center gap-2">
                <ThemeToggle variant="icon" size="sm" />
                <button 
                  onClick={onClose} 
                  className="
                    p-2 rounded-edge hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors duration-300 ease-edge
                    focus:outline-none focus:ring-2 focus:ring-edge-500/20
                  "
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="sr-only">Close Menu</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Auth Section */}
              <div className="mb-8">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    {/* User Profile Card */}
                    <div className="
                      flex items-center space-x-3 p-4
                      bg-gradient-to-r from-edge-50 to-edge-100 dark:from-gray-800 dark:to-gray-700
                      border border-edge-200/50 dark:border-gray-600/50
                      rounded-edge-lg shadow-edge-sm
                    ">
                      <div className="w-12 h-12 bg-gradient-to-br from-edge-500 to-edge-600 text-white rounded-edge-lg flex items-center justify-center shadow-edge-md">
                        {session?.user?.name ? (
                          <span className="font-bold text-lg">
                            {session.user.name.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User size={24} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {session?.user?.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                    
                    {/* User Menu Options */}
                    <div className="space-y-1">
                      <Link 
                        href="/profile" 
                        onClick={onClose}
                        className="
                          flex items-center px-4 py-3 rounded-edge
                          text-gray-700 dark:text-gray-300
                          hover:bg-white/50 dark:hover:bg-gray-800/50
                          hover:text-edge-600 dark:hover:text-edge-400
                          transition-all duration-300 ease-edge
                          hover:translate-x-1
                        "
                      >
                        <User size={18} className="mr-3" />
                        <span className="font-medium">My Profile</span>
                      </Link>
                      
                      <Link 
                        href="/settings" 
                        onClick={onClose}
                        className="
                          flex items-center px-4 py-3 rounded-edge
                          text-gray-700 dark:text-gray-300
                          hover:bg-white/50 dark:hover:bg-gray-800/50
                          hover:text-edge-600 dark:hover:text-edge-400
                          transition-all duration-300 ease-edge
                          hover:translate-x-1
                        "
                      >
                        <Settings size={18} className="mr-3" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          onClose();
                          signOut({ callbackUrl: "/" });
                        }}
                        className="
                          w-full flex items-center px-4 py-3 rounded-edge text-left
                          text-red-600 dark:text-red-400
                          hover:bg-red-50 dark:hover:bg-red-900/20
                          transition-all duration-300 ease-edge
                          hover:translate-x-1
                        "
                      >
                        <LogOut size={18} className="mr-3" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/register" onClick={onClose}>
                      <button className="
                        w-full px-4 py-3 rounded-edge font-semibold
                        bg-gradient-to-r from-edge-500 to-edge-600
                        text-white shadow-edge-md hover:shadow-edge-lg
                        hover:from-edge-600 hover:to-edge-700
                        transition-all duration-300 ease-edge
                        hover:scale-105
                      ">
                        Sign Up
                      </button>
                    </Link>
                    <Link href="/login" onClick={onClose}>
                      <button className="
                        w-full px-4 py-3 rounded-edge font-semibold
                        border-2 border-edge-500 text-edge-600 dark:text-edge-400
                        hover:bg-edge-50 dark:hover:bg-edge-900/20
                        transition-all duration-300 ease-edge
                        hover:scale-105
                      ">
                        Sign In
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Navigation Sections */}
              <NavSection title="" links={mainLinks} onLinkClick={onClose} />
              <NavSection title="News Categories" links={newsCategories} onLinkClick={onClose} />
              <NavSection title="Regional" links={regionalNews} onLinkClick={onClose} />
              <NavSection title="Services" links={services} onLinkClick={onClose} />
              <NavSection title="Edge Network" links={network} onLinkClick={onClose} />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}