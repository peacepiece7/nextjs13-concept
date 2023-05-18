/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'academy.dream-coding.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products/delected_forever',
        destination: '/products',
        // redirect status 308, 페이지가 여기로 영원이 이동했으니까 캐싱해도 된다고 크롤러에게 알려줌
        permanent: true,
      },
      {
        source: '/products/delected_forever_temp',
        destination: '/products',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
