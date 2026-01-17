/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel optimization: Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,

  // Vercel requires strict type checking
  typescript: {
    ignoreBuildErrors: false,
  },

  // Vercel requires strict linting
  eslint: {
    ignoreDuringBuilds: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'img.rocket.new',
      },
    ],
  },

  // Removed redirects - using app/page.tsx instead for better Vercel compatibility
};

export default nextConfig;
