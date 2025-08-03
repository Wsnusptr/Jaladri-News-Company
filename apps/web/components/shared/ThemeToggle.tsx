"use client";

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface SharedThemeToggleProps {
  variant?: 'icon' | 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  variant = 'icon', 
  size = 'md',
  showLabel = false 
}: SharedThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`
        ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}
        bg-gray-200 dark:bg-gray-700 rounded-edge animate-pulse
      `} />
    );
  }

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            ${buttonSize} relative flex items-center justify-center
            bg-white/80 dark:bg-gray-800/80 backdrop-blur-edge
            border border-gray-200/50 dark:border-gray-700/50
            rounded-edge shadow-edge-sm hover:shadow-edge-md
            transition-all duration-300 ease-edge
            hover:bg-white dark:hover:bg-gray-800
            focus:outline-none focus:ring-2 focus:ring-edge-500/20
            group
          `}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className={`${iconSize} text-edge-400 group-hover:text-edge-300 transition-colors`} />
          ) : (
            <Sun className={`${iconSize} text-edge-600 group-hover:text-edge-500 transition-colors`} />
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-edge border border-gray-200/50 dark:border-gray-700/50 rounded-edge-lg shadow-edge-lg z-50">
            <button
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Moon className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Dark</span>
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Monitor className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`
          ${showLabel ? 'px-4 py-2' : buttonSize}
          relative flex items-center justify-center gap-2
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-edge
          border border-gray-200/50 dark:border-gray-700/50
          rounded-edge shadow-edge-sm hover:shadow-edge-md
          transition-all duration-300 ease-edge
          hover:bg-white dark:hover:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-edge-500/20
          group
        `}
        aria-label="Toggle theme"
      >
        <div className="relative">
          <Sun className={`
            ${iconSize} absolute inset-0 text-amber-500
            transition-all duration-300 ease-edge
            ${resolvedTheme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `} />
          <Moon className={`
            ${iconSize} text-blue-400
            transition-all duration-300 ease-edge
            ${resolvedTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
          `} />
        </div>
        {showLabel && (
          <span className="text-sm font-medium">
            {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
          </span>
        )}
      </button>
    );
  }

  // Default icon variant
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`
        ${buttonSize} relative flex items-center justify-center
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-edge
        border border-gray-200/50 dark:border-gray-700/50
        rounded-edge shadow-edge-sm hover:shadow-edge-md
        transition-all duration-300 ease-edge
        hover:bg-white dark:hover:bg-gray-800
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-edge-500/20
        group
      `}
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun className={`
          ${iconSize} absolute inset-0 text-amber-500
          transition-all duration-300 ease-edge
          ${resolvedTheme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
        `} />
        <Moon className={`
          ${iconSize} text-blue-400
          transition-all duration-300 ease-edge
          ${resolvedTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
        `} />
      </div>
    </button>
  );
}