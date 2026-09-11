/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep a live development server from corrupting production build manifests.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
    ],
  },
};

export default nextConfig;
