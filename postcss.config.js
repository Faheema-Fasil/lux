// postcss.config.js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},      // Enables Tailwind CSS
    autoprefixer: {},     // Adds Autoprefixer for browser compatibility
  },
};

module.exports = config;
