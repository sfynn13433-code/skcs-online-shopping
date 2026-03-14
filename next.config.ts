/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 82, 90, 100], // fixes the "quality 82" warning

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

      // Amazon main CDN
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },

      // Amazon alternate CDN
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/**',
      },

      // Some Amazon images also load from this CDN
      {
        protocol: 'https',
        hostname: 'images.amazon.com',
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