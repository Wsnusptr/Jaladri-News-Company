// apps/cms/app/dashboard-layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer'; // Import the Footer component

// Sidebar component
function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">CMS Panel</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className={`block py-2.5 px-4 rounded-md hover:bg-gray-700 ${
                pathname === '/' ? 'bg-gray-900 font-semibold' : ''
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/articles" 
              className={`block py-2.5 px-4 rounded-md hover:bg-gray-700 ${
                pathname.includes('/articles') ? 'bg-gray-900 font-semibold' : ''
              }`}
            >
              Artikel
            </Link>
          </li>
          <li>
            <Link 
              href="/drafts" 
              className={`block py-2.5 px-4 rounded-md hover:bg-gray-700 ${
                pathname.includes('/drafts') ? 'bg-gray-900 font-semibold' : ''
              }`}
            >
              Draft Artikel
            </Link>
          </li>
          <li>
            <Link 
              href="/live-tv" 
              className={`block py-2.5 px-4 rounded-md hover:bg-gray-700 ${
                pathname.includes('/live-tv') ? 'bg-gray-900 font-semibold' : ''
              }`}
            >
              📺 Live TV Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar onSignOut={() => {}} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
