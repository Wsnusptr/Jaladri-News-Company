"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Logged in state with dropdown
  if (session?.user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 py-1 px-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
            {session.user.name ? (
              session.user.name.charAt(0).toUpperCase()
            ) : (
              <User size={16} />
            )}
          </div>
          <span className="text-sm font-medium hidden md:inline">
            {session.user.name || session.user.email?.split('@')[0]}
          </span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium">{session.user.name || 'Pengguna'}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
            
            <Link 
              href="/profile" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              Profil Saya
            </Link>
            
            <Link 
              href="/settings" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Pengaturan
            </Link>
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Keluar
            </button>
          </div>
        )}
      </div>
    );
  }

  // Not logged in state
  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/register"
        className="py-1.5 px-3 text-sm font-medium text-blue-600 hover:text-blue-800 hidden md:block"
      >
        Daftar
      </Link>
      <Link
        href="/login"
        className="py-1.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
      >
        Masuk
      </Link>
    </div>
  );
}