/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      // Add polyfills for Web APIs that might be needed
      crypto: false,
      stream: false,
      os: false,
    };

    return config;
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  experimental: {
    // appDir is no longer experimental in newer Next.js versions
    appDir: true,
  },

  typescript: {
    // Allows production builds to complete despite TypeScript errors
    ignoreBuildErrors: true,
  },

  eslint: {
    // Allows production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },

  // Add additional security headers including permissions policy for microphone
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'microphone=self', // Explicitly allow microphone usage on your domain
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;