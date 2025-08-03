"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article, User } from '@repo/db';
import { useSession } from 'next-auth/react';
import { getArticles } from '@repo/db';

// Gabungkan tipe Article dengan informasi penulis
type ArticleWithAuthor = Article & { author: User | null };

// Helper function untuk warna status
const getStatusPill = (status: string) => {
    switch (status) {
        case 'PUBLISHED': return 'bg-green-100 text-green-800';
        case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// Helper function untuk mendapatkan penempatan artikel saat ini
const getCurrentPlacement = (article: ArticleWithAuthor) => {
    if (article.isHotNews) return 'hot';
    if (article.isSlider) return 'slider';
    if (article.isRecommendation) return 'recommendation';
    return 'normal';
};

// Helper function untuk mendapatkan label penempatan
const getPlacementLabel = (placement: string) => {
    switch (placement) {
        case 'hot': return '🔥 Hot News';
        case 'slider': return '🎯 Slider';
        case 'recommendation': return '⭐ Rekomendasi';
        default: return '📄 Normal';
    }
};

export default function ArticlesPage() {
    const { data: session, status: sessionStatus } = useSession();
    const [articles, setArticles] = useState<ArticleWithAuthor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fungsi untuk memuat data artikel PUBLISHED dari API Proxy
    const loadArticles = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Hanya ambil artikel yang sudah dipublikasikan untuk manajemen
            const response = await fetch('/api/proxy/articles?status=PUBLISHED'); 
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gagal memuat artikel: ${errorText}`);
            }
            const data = await response.json();
            setArticles(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Muat artikel saat sesi sudah terautentikasi
    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            loadArticles();
        } else if (sessionStatus === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [sessionStatus]);

    // Fungsi untuk menghapus artikel
    const handleDelete = async (id: string) => {
        if (!confirm('Anda yakin ingin menghapus artikel ini?')) return;
        try {
            const response = await fetch(`/api/proxy/articles/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Gagal menghapus artikel');
            // Muat ulang data setelah berhasil menghapus
            loadArticles();
            alert('Artikel berhasil dihapus');
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    // Fungsi untuk mengubah penempatan artikel
    const handlePlacementChange = async (id: string, placement: string) => {
        try {
            const placementData = {
                isHotNews: placement === 'hot',
                isSlider: placement === 'slider',
                isRecommendation: placement === 'recommendation'
            };

            const response = await fetch(`/api/proxy/articles/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(placementData),
            });
            if (!response.ok) throw new Error('Gagal mengubah penempatan artikel');
            // Muat ulang data setelah berhasil mengubah
            loadArticles();
            
            const placementNames = {
                'hot': 'Hot News',
                'slider': 'Slider Utama',
                'recommendation': 'Rekomendasi',
                'normal': 'Normal'
            };
            alert(`Artikel ditempatkan di: ${placementNames[placement as keyof typeof placementNames]}`);
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    const isAdmin = (session?.user as any)?.role === 'ADMIN';
    // Filter artikel: Admin melihat semua, User hanya melihat tulisan sendiri
    const articlesToShow = isAdmin 
        ? articles 
        : articles.filter(a => a.authorId === session?.user?.id);

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manajemen Artikel</h1>
                    <p className="text-gray-600 mt-1">Kelola artikel yang sudah dipublikasikan di website</p>
                </div>
                <Link href="/articles/new" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm w-full md:w-auto text-center">
                    + Tambah Artikel Baru
                </Link>
            </div>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm mb-4">{error}</div>}

            {isLoading ? (
                <div className="text-center py-10"><p className="text-gray-500">Memuat artikel...</p></div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Tampilan Tabel untuk Desktop */}
                    <table className="min-w-full divide-y divide-gray-200 text-sm hidden md:table">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                                {isAdmin && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>}
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penempatan</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articlesToShow.map((article) => (
                                <tr key={article.id}>
                                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-xs" title={article.title}>{article.title}</td>
                                    {isAdmin && <td className="px-4 py-3 text-gray-500">{article.author?.name || 'N/A'}</td>}
                                    <td className="px-4 py-3"><span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusPill(article.status)}`}>{article.status}</span></td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={getCurrentPlacement(article)}
                                            onChange={(e) => handlePlacementChange(article.id, e.target.value)}
                                            className="text-xs px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="normal">📄 Normal</option>
                                            <option value="hot">🔥 Hot News</option>
                                            <option value="slider">🎯 Slider Utama</option>
                                            <option value="recommendation">⭐ Rekomendasi</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-right font-medium">
                                        <div className="flex justify-end space-x-4">
                                            <Link href={`/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                            {isAdmin && <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900">Hapus</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Tampilan Kartu untuk Mobile */}
                    <div className="md:hidden">
                        {articlesToShow.map((article) => (
                            <div key={article.id} className="border-b border-gray-200 p-4 space-y-3">
                                <div className="font-bold text-gray-900">{article.title}</div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{isAdmin ? (article.author?.name || 'N/A') : ''}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 inline-flex font-semibold rounded-full ${getStatusPill(article.status)}`}>{article.status}</span>
                                        <select
                                            value={getCurrentPlacement(article)}
                                            onChange={(e) => handlePlacementChange(article.id, e.target.value)}
                                            className="text-xs px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="normal">📄 Normal</option>
                                            <option value="hot">🔥 Hot News</option>
                                            <option value="slider">🎯 Slider</option>
                                            <option value="recommendation">⭐ Rekomendasi</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex space-x-3 pt-2">
                                    <Link href={`/articles/${article.id}/edit`} className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-center py-2 px-3 rounded-md text-sm font-medium">Edit</Link>
                                    {isAdmin && <button onClick={() => handleDelete(article.id)} className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 text-center py-2 px-3 rounded-md text-sm font-medium">Hapus</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
