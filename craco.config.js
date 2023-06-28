/* eslint-disable */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    port: 8000, // B 端，前端
    proxy: {
      '/api': 'http://localhost:4500', // Mock
    },
  },
};
