/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}
