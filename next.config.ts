/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      // Added Amazon images!
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
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