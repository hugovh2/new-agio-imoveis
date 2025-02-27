/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // Permite carregar imagens do Cloudinary
    unoptimized: true,
  },
};

module.exports = nextConfig;
