/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	  // Disable Webpack's cache
	  config.cache = false;
	  return config;
	},
  };
  
