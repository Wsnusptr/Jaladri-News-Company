"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Article, User } from '@repo/db';
import { Check, X, Edit } from 'lucide-react';

type ArticleWithAuthor = Article & { author: User | null };

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<ArticleWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  // Function to fetch drafts from the correct proxy endpoint
  const fetchDrafts = async () => {
    setLoading(true);
    setError('');
    try {
      // PERBAIKAN: Gunakan API proxy yang benar
      const response = await fetch('/api/proxy/articles?status=DRAFT');
      if (!response.ok) throw new Error('Gagal memuat draft');
      const data = await response.json();
      setDrafts(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat draft artikel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect if not an admin
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
    // Fetch data only if authenticated as an admin
    if (status === 'authenticated' && (session?.user as any)?.role === 'ADMIN') {
      fetchDrafts();
    }
  }, [status, session, router]);

  const handleApprove = async (id: string) => {
    try {
      // PERBAIKAN: Panggil proxy untuk update status
      const response = await fetch(`/api/proxy/articles/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PUBLISHED' }),
      });
      if (!response.ok) throw new Error('Gagal menyetujui artikel');
      fetchDrafts(); // Refresh the list
      alert('Artikel berhasil disetujui dan dipublikasikan!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Menolak akan menghapus draft ini secara permanen. Lanjutkan?')) return;
    try {
      // PERBAIKAN: Rejecting now means deleting the article
      const response = await fetch(`/api/proxy/articles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Gagal menolak (menghapus) artikel');
      fetchDrafts(); // Refresh the list
      alert('Draft artikel berhasil ditolak dan dihapus.');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-center">Memuat data draft...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Review Draft Artikel</h1>
        <p className="mt-2 text-gray-600">
          Artikel yang menunggu persetujuan dari reporter dan kontributor.
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg text-center shadow-md">
          <p className="text-gray-500">Tidak ada draft artikel yang perlu direview saat ini. Kerja bagus! ✅</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Responsive Table for Desktop */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drafts.map((draft) => (
                <tr key={draft.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{draft.title}</div>
                    <div className="text-xs text-gray-500">{(draft as any).categories?.map((c: any) => c.name).join(', ') || 'No categories'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{draft.author?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/articles/${draft.id}/edit`} className="text-blue-600 hover:text-blue-900" title="Edit">
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleApprove(draft.id)} className="text-green-600 hover:text-green-900" title="Setujui & Publikasikan">
                        <Check className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleReject(draft.id)} className="text-red-600 hover:text-red-900" title="Tolak & Hapus">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Responsive Cards for Mobile */}
          <div className="md:hidden">
            {drafts.map((draft) => (
                <div key={draft.id} className="border-b p-4 space-y-3">
                    <div className="font-bold text-gray-800">{draft.title}</div>
                    <div className="text-xs text-gray-500">
                        Oleh: {draft.author?.name || 'N/A'}
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                        <Link href={`/articles/${draft.id}/edit`} className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-center py-2 px-3 rounded-md text-sm font-medium">Edit</Link>
                        <button onClick={() => handleApprove(draft.id)} className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 text-center py-2 px-3 rounded-md text-sm font-medium">Setujui</button>
                        <button onClick={() => handleReject(draft.id)} className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 text-center py-2 px-3 rounded-md text-sm font-medium">Tolak</button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}