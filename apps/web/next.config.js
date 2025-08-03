// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', 'ui'],

  // Prisma configuration for monorepo (Next.js 15)
  serverExternalPackages: ['@prisma/client', 'prisma'],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  },

  // Fix for Windows generateBuildId crypto issue
  generateBuildId: async () => {
    if (process.env.NODE_ENV === 'production') {
      const crypto = require('crypto');
      return crypto.randomBytes(16).toString('hex');
    }
    // Use timestamp for development builds
    return Date.now().toString();
  },

  // Konfigurasi CORS untuk API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // For production, be more specific. For development, "*" is okay.
          // Example for production:
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV === 'production' ? process.env.NEXTAUTH_URL || "*" : "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },

  images: {
    // Untuk produksi, set unoptimized: false untuk mengoptimalkan gambar
    // Namun pastikan semua URL gambar valid terlebih dahulu
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Konfigurasi domain gambar yang diizinkan
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: '**.detik.com' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'akcdn.detik.net.id' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      // Tambahkan domain CDN atau storage Anda sendiri untuk produksi
      // { protocol: 'https', hostname: 'cdn.yourdomain.com' },
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
