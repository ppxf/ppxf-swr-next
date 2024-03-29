const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

const nextConfig = withBundleAnalyzer({
    reactStrictMode: false,
});

module.exports = nextConfig;