/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://raagai-backend.vercel.app/api',
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'https://raagai-backend.vercel.app/api',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  },
};

export default nextConfig;

