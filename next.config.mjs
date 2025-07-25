/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  // We don't need rewrites for static files as they're served directly from public
  // Handle static assets without server processing
  trailingSlash: false,
};

export default nextConfig;
