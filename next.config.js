const { execSync } = require('child_process');

/* function getTag() {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (error) {
    console.error('Failed to get the tag:', error);
    return 'unknown-build-id';
  }
} */

  function getCommitHash() {
    try {
      return execSync('git rev-parse --short HEAD').toString().trim();
    } catch (error) {
      console.error('Failed to get the commit hash:', error);
      // Fallback to a different build ID if no commit hash is found or an error occurs
      return `build-${Date.now()}`;
    }
  }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /* generateBuildId: async () => {
    return getTag();
  }, */
  generateBuildId: async () => {
    return getCommitHash();
  },
};

module.exports = nextConfig;
