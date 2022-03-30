const withPWA = require("next-pwa");
// const withImages = require("next-images");

// module.exports = withImages({
//   images: {
//     domains: ["imgur.com"],
//   },
// });

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
