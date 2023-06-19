/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    unoptimized: true
  },
  reactStrictMode: true
}


module.exports = nextConfig
