const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: [
      "assets.coingecko.com",
      "walletconnect.org",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
