/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'unsplash.com',
      'via.placeholder.com',
      'picsum.photos',
      'source.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  // 启用压缩
  compress: true,
  // 启用 SWC minify
  swcMinify: true,
  // 生产环境优化
  poweredByHeader: false,
  // 启用静态导出优化
  trailingSlash: false,
  // 环境变量配置
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
