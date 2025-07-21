/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  // Configure static file serving
  async rewrites() {
    return [
      {
        source: "/work/:path*",
        destination: "/public/work/:path*",
      },
    ];
  },
  // Add proper encoding for URLs with spaces
  async headers() {
    return [
      {
        source: "/work/:path*",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
