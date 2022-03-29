const withPWA = require("next-pwa");

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  images: {
    domains: ["assets.vercel.com"],
    formats: ["image/avif", "image/webp"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
