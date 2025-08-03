import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200/70 dark:border-gray-800/70 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            JALADRI
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} JALADRI. All rights reserved.
          </div>
          
          {/* Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/articles" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Articles
            </Link>
            <Link href="/drafts" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              Drafts
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}