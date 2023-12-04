/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
]);

require('dotenv').config()
const webpack = require('webpack')

module.exports = withTM({
  images: {
    domains: [
      // "primefaces.org",
      // "edbrix.com",
      // "img.youtube.com",
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: '**.edbrix.com',
    //     port: '',
    //     pathname: '/images/**',
    //   },
    //   {
    //     protocol: 'https',
    //     // hostname: '**.pdprogram.s3.us-east-2.amazonaws.com',
    //     hostname: 'pdprogram.s3.us-east-2.amazonaws.com',
    //     port: '',
    //     pathname: '/uploads/**',
    //   },
    // ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: '/',
      },
    ]
  },

  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
});