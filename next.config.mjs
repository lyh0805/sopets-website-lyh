/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  webpack: (config) => {
    // Add rule for JSON files
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    // Handle Node.js modules that are not available in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
  transpilePackages: ['pixi.js', '@esotericsoftware/spine-pixi-v8', '@esotericsoftware/spine-core'],
};

export default nextConfig; 