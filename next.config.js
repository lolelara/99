/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig; 