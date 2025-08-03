// apps/cms/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', 'ui'],

  // Fix for Windows generateBuildId crypto issue
  generateBuildId: async () => {
    if (process.env.NODE_ENV === 'production') {
      const crypto = require('crypto');
      return crypto.randomBytes(16).toString('hex');
    }
    // Use timestamp for development builds
    return Date.now().toString();
  },

  // Menggunakan port yang berbeda untuk CMS
  serverRuntimeConfig: {
    port: 3001
  },

  // Konfigurasi CORS untuk API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL || "*" : "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },

  images: {
    // Untuk produksi, set unoptimized: false untuk mengoptimalkan gambar
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Untuk CMS, kita perlu mengizinkan berbagai sumber gambar
      // Namun untuk produksi, sebaiknya batasi domain yang diizinkan
      {
        protocol: 'https',
        hostname: '**',
      },
      // Hapus ini untuk produksi dan ganti dengan domain spesifik
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // output: 'standalone', // Disabled for Windows symlink issues
};

module.exports = nextConfig;