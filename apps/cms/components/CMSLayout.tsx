"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, LayoutDashboard, Menu, Send, Monitor } from 'lucide-react';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

// AuthGuard component now correctly handles public routes as well
function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = pathname === '/login' || pathname === '/unauthorized';

    useEffect(() => {
        // Don't do anything while session is loading
        if (status === 'loading') return;

        // If on a private route and not logged in, redirect to login
        if (!isPublicRoute && !session) {
            router.push('/login');
            return;
        }

        // If on a private route and logged in but not an ADMIN, redirect
        if (!isPublicRoute && (session?.user as any)?.role !== 'ADMIN') {
            router.push('/unauthorized');
        }
    }, [session, status, router, isPublicRoute, pathname]);

    // If it's a public page, show it immediately
    if (isPublicRoute) {
        return <>{children}</>;
    }

    // If it's a private page and user is a confirmed ADMIN, show the content
    if ((session?.user as any)?.role === 'ADMIN') {
        return <>{children}</>;
    }

    // Otherwise, show the loading state
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Memeriksa hak akses...</p>
        </div>
    );
}

// Sidebar component (no changes needed)
function Sidebar() {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <Link href="/" className="text-2xl font-bold text-white">Jaladri CMS</Link>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <Link href="/" className="flex items-center gap-3 py-2.5 px-4 rounded-md hover:bg-gray-700">
                    <LayoutDashboard className="w-5 h-5" /><span>Dashboard</span>
                </Link>
                <Link href="/articles" className="flex items-center gap-3 py-2.5 px-4 rounded-md hover:bg-gray-700">
                    <FileText className="w-5 h-5" /><span>Artikel</span>
                </Link>
                <Link href="/drafts" className="flex items-center gap-3 py-2.5 px-4 rounded-md hover:bg-gray-700">
                    <Send className="w-5 h-5" /><span>Review Drafts</span>
                </Link>
                <Link href="/live-tv" className="flex items-center gap-3 py-2.5 px-4 rounded-md hover:bg-gray-700">
                    <Monitor className="w-5 h-5" /><span>Manajemen Live TV</span>
                </Link>
            </nav>
        </div>
    );
}

// Main CMSLayout component
export function CMSLayout({ children }: { children: React.ReactNode; }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SessionProvider>
            <AuthGuard>
                <div className="flex h-screen overflow-hidden">
                    <aside className="w-64 bg-gray-800 text-white hidden md:flex flex-col flex-shrink-0">
                        <Sidebar />
                    </aside>
                    {sidebarOpen && (
                        <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)}>
                            <aside className="absolute left-0 top-0 h-full w-64 bg-gray-800 text-white z-40">
                                <Sidebar />
                            </aside>
                        </div>
                    )}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="md:hidden bg-white shadow-sm flex items-center justify-between p-4">
                            <Link href="/" className="text-lg font-bold">Jaladri CMS</Link>
                            <button onClick={() => setSidebarOpen(true)} className="p-2">
                                <Menu className="h-6 w-6" />
                            </button>
                        </header>
                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </AuthGuard>
        </SessionProvider>
    );
}