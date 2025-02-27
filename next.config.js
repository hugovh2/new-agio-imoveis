/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // Permite imagens do Cloudinary
    unoptimized: true,
  },
};

module.exports = nextConfig;
