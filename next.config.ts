/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 82, 90, 100], // <-- This fixes the "quality 82" error
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.aliexpress-media.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      // Added the missing Amazon image server!
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@/lib': './src/lib',
      '@/lib/': './src/lib/',
    },
  },
};

export default nextConfig;