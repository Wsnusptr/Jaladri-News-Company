"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LiveTVComments } from '../../components/live-tv/LiveTVComments';

interface LiveTV {
  id: string;
  title: string;
  embedUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById?: string;
  createdBy?: { name: string };
}

export default function LiveTVPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [liveStreams, setLiveStreams] = useState<LiveTV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    embedUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStream, setActiveStream] = useState<LiveTV | null>(null);

  // Load live TV streams
  const loadLiveStreams = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/proxy/live-tv');
      if (!response.ok) {
        throw new Error('Gagal memuat data live TV');
      }
      const data = await response.json();
      setLiveStreams(data);
      
      // Find active stream
      const active = data.find((stream: LiveTV) => stream.isActive);
      setActiveStream(active || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      loadLiveStreams();
    } else if (sessionStatus === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [sessionStatus]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.embedUrl.trim()) {
      alert('Judul dan URL embed wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/proxy/live-tv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat live stream');
      }

      await loadLiveStreams();
      setFormData({ title: '', embedUrl: '' });
      alert('Live stream berhasil dibuat');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/proxy/live-tv/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengubah status live stream');
      }

      await loadLiveStreams();
      alert(`Live stream ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Delete live stream
  const handleDelete = async (id: string) => {
    if (!confirm('Anda yakin ingin menghapus live stream ini?')) return;

    try {
      const response = await fetch(`/api/proxy/live-tv/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus live stream');
      }

      await loadLiveStreams();
      alert('Live stream berhasil dihapus');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // Extract YouTube video ID from various URL formats
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Handle embed URL conversion
  const handleEmbedUrlChange = (url: string) => {
    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
      setFormData(prev => ({ ...prev, embedUrl }));
    } else {
      setFormData(prev => ({ ...prev, embedUrl: url }));
    }
  };

  if (sessionStatus === 'loading' || isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center py-10">
          <p className="text-gray-500">Memuat...</p>
        </div>
      </div>
    );
  }

  if (sessionStatus !== 'authenticated') {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center py-10">
          <p className="text-gray-500">Anda harus login untuk mengakses halaman ini</p>
        </div>
      </div>
    );
  }

  const isAdmin = (session?.user as any)?.role === 'ADMIN';

  if (!isAdmin) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center py-10">
          <p className="text-gray-500">Hanya admin yang dapat mengakses halaman ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Kembali
        </button>
        <button
          onClick={loadLiveStreams}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Live TV Management</h1>
      </div>
      <div className="mb-8">
        <p className="text-gray-600">Kelola siaran langsung yang akan ditampilkan di website</p>
        {/* Active Stream Indicator */}
        {activeStream && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-red-800">Currently Live: {activeStream.title}</p>
                <p className="text-sm text-red-600">Viewers can see this stream and chat with you in real-time</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded text-sm mb-6">
          {error}
        </div>
      )}

      {/* Add New Live Stream Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Siaran Langsung Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Siaran
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan judul siaran langsung"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL YouTube atau Embed Code
            </label>
            <textarea
              value={formData.embedUrl}
              onChange={(e) => handleEmbedUrlChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste URL YouTube atau kode embed di sini"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Contoh: https://www.youtube.com/watch?v=VIDEO_ID atau https://youtu.be/VIDEO_ID
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-md font-medium transition-colors"
            >
              {isSubmitting ? 'Membuat...' : '🔴 Start Live Broadcast'}
            </button>
          </div>
        </form>
      </div>

      {/* Live Chat Section - Only show when there's an active stream */}
      {activeStream && (
        <div className="mb-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Stream Preview */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></span>
                  Live Stream Preview
                </h2>
              </div>
              <div className="p-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={activeStream.embedUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={activeStream.title}
                  />
                </div>
              </div>
            </div>
            
            {/* Live Chat */}
            <div>
              <LiveTVComments liveTVId={activeStream.id} isAdmin={true} />
            </div>
          </div>
        </div>
      )}

      {/* Live Streams List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Daftar Siaran Langsung</h2>
        </div>
        
        {liveStreams.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Belum ada siaran langsung yang dibuat
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {liveStreams.map((stream) => (
              <div key={stream.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {stream.title}
                    </h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Dibuat: {new Date(stream.createdAt).toLocaleString('id-ID')}</p>
                      <p>Status: 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          stream.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {stream.isActive ? '🔴 LIVE' : '⚫ OFFLINE'}
                        </span>
                      </p>
                      <div className="mt-2">
                        <p className="text-xs">Embed URL:</p>
                        <code className="text-xs bg-gray-100 p-1 rounded break-all">
                          {stream.embedUrl}
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <button
                      onClick={() => handleToggleActive(stream.id, stream.isActive)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        stream.isActive
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {stream.isActive ? 'Stop' : 'Start'}
                    </button>
                    <button
                      onClick={() => handleDelete(stream.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-md text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
