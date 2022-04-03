const withPWA = require("next-pwa");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = withPWA({
  productionBrowserSourceMaps: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
