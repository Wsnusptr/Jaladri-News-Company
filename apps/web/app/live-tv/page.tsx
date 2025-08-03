'use client';

import { Suspense, useEffect, useState } from 'react';
import { LiveTVComments } from '@/components/live-tv/LiveTVComments';

interface LiveTVStream {
  id: string;
  title: string;
  embedUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

function useLiveStream() {
  const [activeStream, setActiveStream] = useState<LiveTVStream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveLiveStream() {
      try {
        const response = await fetch('/api/live-tv/active');
        
        if (response.ok) {
          const streams = await response.json();
          setActiveStream(streams.length > 0 ? streams[0] : null);
        }
      } catch (error) {
        console.error('Error fetching active live stream:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveLiveStream();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchActiveLiveStream, 30000);
    return () => clearInterval(interval);
  }, []);

  return { activeStream, loading };
}

function LiveStreamPlayer({ stream }: { stream: LiveTVStream }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-red-600 text-white px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{stream.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="aspect-video">
          <iframe
            src={stream.embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={stream.title}
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Siaran Langsung JaladriNews</span>
          <span>Dimulai: {new Date(stream.createdAt).toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
}

function NoLiveStreamMessage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Tidak Ada Siaran Langsung</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Saat ini tidak ada siaran langsung yang sedang berlangsung. 
          Silakan kembali lagi nanti untuk menonton siaran langsung dari JaladriNews.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Tips:</strong> Bookmark halaman ini dan dapatkan notifikasi ketika ada siaran langsung baru!
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingLiveStream() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700 animate-pulse px-6 py-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      </div>
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-6">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export default function LiveTVPage() {
  const { activeStream, loading } = useLiveStream();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">JaladriNews Live TV</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Saksikan siaran langsung berita terkini, wawancara eksklusif, dan liputan khusus dari tim JaladriNews. 
            Tetap terhubung dengan informasi terbaru langsung dari lapangan.
          </p>
        </div>

        {/* Live Stream Content */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <LoadingLiveStream />
          ) : activeStream ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <LiveStreamPlayer stream={activeStream} />
              </div>
              
              {/* Live Chat */}
              <div className="lg:col-span-1">
                <LiveTVComments liveTVId={activeStream.id} />
              </div>
            </div>
          ) : (
            <NoLiveStreamMessage />
          )}
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tentang JaladriNews Live TV</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📺 Siaran Berkualitas Tinggi</h3>
                <p className="text-gray-600 text-sm">
                  Nikmati siaran langsung dengan kualitas video HD dan audio jernih langsung dari studio JaladriNews.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">⚡ Update Real-time</h3>     
                <p className="text-gray-600 text-sm">
                  Dapatkan berita breaking news dan informasi terkini yang disiarkan langsung tanpa delay.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🌐 Akses Dimana Saja</h3>
                <p className="text-gray-600 text-sm">
                  Tonton siaran langsung dari perangkat apapun - desktop, tablet, atau smartphone Anda.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💬 Interaktif</h3>
                <p className="text-gray-600 text-sm">
                  Siaran langsung yang memungkinkan interaksi dan feedback langsung dari pemirsa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Metadata moved to layout.tsx since this is now a client component
