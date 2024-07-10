const { execSync } = require('child_process');

function getTag() {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (error) {
    console.error('Failed to get the tag:', error);
    return 'unknown-build-id';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  generateBuildId: async () => {
    return getTag();
  },
};

module.exports = nextConfig;
