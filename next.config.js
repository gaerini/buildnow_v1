module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    OCR_SECRET_KEY: process.env.OCR_SECRET_KEY,
  },
  images: {
    domains: ["i.ibb.co"],
  },
};
