// postcss-test.config.js
const atImport = require('postcss-import');
const path = require('path');

module.exports = {
  plugins: [
    atImport({
      path: [path.join(__dirname, 'src')] // Explicitly search 'src' directory
    }),
  ],
};