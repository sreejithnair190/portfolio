/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'placeholder.com',
  //     },
  //   ],
  // },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Cache and performance
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

export default nextConfig

