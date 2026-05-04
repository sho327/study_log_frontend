/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的サイト生成
  output: 'export',
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
