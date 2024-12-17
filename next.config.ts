import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_APPWRITE_KEY: 'standard_ad3eec9898a58fd465c7f6145df2cb8256a3b4f71dafc5fd325ab4503f733f2913dd076ff16918322b5df2ade00b9c0bab44de7416a21aa44dce3b6f1914578613198a7b705da624d66eb533f27b07826e4cc02d65c013f01e447a13fb48634029661e1df35583659750e3085d3ef77ba043cd5e4758ecce89999ead7ab79d10',
    NEXT_PUBLIC_APPWRITE_ENDPOINT: 'https://cloud.appwrite.io/v1',
    NEXT_PUBLIC_APPWRITE_PROJECT: '6756e47f000db4e5ba7a',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    APPWRITE_DATABASE_ID: '675d443d002dfcbd585a',
    APPWRITE_USER_COLLECTION_ID: '675d444e00353d96e21b',
    GITHUB_CLIENT_ID: 'Ov23lilGLwwFoEG3OKZd',
    GITHUB_CLIENT_SECRET: '6d0125e649f22706a5a06c28bc040b11c5785b4e',
  },
};

export default nextConfig;
