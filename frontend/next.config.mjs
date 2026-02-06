/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // This tells Vercel to ignore lint errors during the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
