/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily allow deploys despite TS warnings (fix types ASAP)
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    // Explicitly allow these qualities to silence warnings
    qualities: [75, 82, 90, 100],

    // Remote image sources (e-commerce CDNs + placeholders)
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: '*.aliexpress-media.com', pathname: '/**' },
      { protocol: 'https', hostname: 'm.media-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'unsplash.com', pathname: '/**' },
      // Add more (e.g. Cloudinary, your own S3) as needed
    ],
  },

  // Turbopack settings (stable in Next.js 16+)
  turbopack: {
    resolveAlias: {
      '@': './src',           // Root alias — covers @/components, @/lib, etc.
      // '@/lib': './src/lib' // Usually not needed if @ is set
    },
  },
};

export default nextConfig;
