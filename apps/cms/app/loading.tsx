import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-8">
        
        {/* Jaladri News Logo Animation */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-24 h-24 border-4 border-red-200 dark:border-red-800 rounded-full animate-spin opacity-50">
            <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
          </div>
          
          {/* Logo container with pulse animation */}
          <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-pulse flex items-center justify-center">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="Jaladri News"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Inner glow effect */}
          <div className="absolute inset-3 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full animate-pulse" />
        </div>

        {/* Loading text with CMS branding */}
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
            <span className="text-red-600">Jaladri</span> <span className="text-blue-600">CMS</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Content Management System
          </p>
          <div className="flex items-center justify-center space-x-1 mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-500">
              Loading dashboard
            </span>
            <div className="flex space-x-1 ml-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce loading-dot-1" />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce loading-dot-2" />
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce loading-dot-3" />
            </div>
          </div>
        </div>

        {/* Enhanced progress bar with brand colors */}
        <div className="w-72 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-red-600 rounded-full loading-progress shadow-sm" />
        </div>
      </div>
    </div>
  );
}
