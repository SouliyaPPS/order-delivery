const withPWA = require("next-pwa");
const withImages = require("next-images");

module.exports = withImages({
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
    domains: ["imgur.com"],
    domains: ["assets.vercel.com"],
    formats: ["image/avif", "image/webp"],
  },
});

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
