import type { NextConfig } from "next";
import webpack from 'webpack';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['node-appwrite'],
    turbo: {
      resolveAlias: {
        "isomorphic-form-data": "./form-data-mock.js",
      },
    },
  },
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
  webpack(config) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^isomorphic-form-data$/,
        `${config.context}/form-data-mock.js`
      )
    );
    return config;
  },
};

export default nextConfig;
