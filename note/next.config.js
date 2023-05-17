/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        host: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
