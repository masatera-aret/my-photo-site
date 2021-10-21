const isProduction = process.env.NODE_ENV === `production`
const path = require('path')

module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: isProduction ? `https://asia-northeast1-my-photo-site-9a0d8.cloudfunctions.net/api
    ` : `http://localhost:5001/my-photo-site-9a0d8/asia-northeast1/api`
  },
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}
