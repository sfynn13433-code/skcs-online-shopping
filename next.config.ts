/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // Map @ to src (most common pattern)
      '@': './src',
      // More granular if needed
      '@/lib': './src/lib',
      '@/lib/': './src/lib/',
    },
  },
};

export default nextConfig;