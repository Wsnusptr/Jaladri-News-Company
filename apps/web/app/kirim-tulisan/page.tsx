"use client";
import { ArticleForm } from "@/components/shared/ArticleForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SubmitArticlePage() {
    const router = useRouter();
    const { status } = useSession();

    const handleSubmit = async (data: any) => {
        const response = await fetch('/api/user-articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Gagal mengirim tulisan');
        }
        
        alert('Tulisan Anda berhasil dikirim dan sedang menunggu persetujuan admin!');
        router.push('/');
    };
    
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Diperlukan</h1>
                    <p className="text-gray-600 mb-6">Anda harus login untuk mengirim tulisan.</p>
                    <Link 
                        href="/login" 
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Login di sini
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Kirim Tulisan Anda</h1>
                    <p className="text-gray-600">
                        Bagikan ide dan cerita Anda kepada dunia. Tulisan yang dikirim akan direview oleh tim editor kami sebelum dipublikasikan.
                    </p>
                </div>
                <ArticleForm onSubmit={handleSubmit} buttonText="Kirim untuk Direview" />
            </div>
        </div>
    );
}