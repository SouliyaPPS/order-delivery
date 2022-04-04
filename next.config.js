const withPWA = require("next-pwa");

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
