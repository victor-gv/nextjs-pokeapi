/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
