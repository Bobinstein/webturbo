/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Existing fallback configuration
      config.resolve.fallback = {
        // ...config.resolve.fallback, // Spread the existing fallbacks
        fs: false,
        // crypto: require.resolve('crypto-browserify'), // Add fallback for 'crypto'
      };

      // Existing alias for `warp-contracts`
      config.resolve.alias['warp-contracts$'] = '/home/stephen/Documents/code/webturbo/node_modules/warp-contracts/bundles/web.bundle.min.js';
    }
    return config;
  },
};

module.exports = nextConfig;