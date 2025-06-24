// postcss.config.js
const relaxcss = require('./dist/index.js'); // Or './src/index.js' if compiled
const purgecss = require('@fullhuman/postcss-purgecss');
const atImport = require('postcss-import'); // Ensure this line exists and is correct
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  plugins: [
    // ⚠️ CRITICAL: postcss-import MUST BE THE FIRST PLUGIN
    atImport({
      // NEW: Explicitly tell postcss-import where to look for imported files.
      // path: [path.resolve(__dirname, 'src')]
      // path.resolve(__dirname, 'src') will resolve to 'your-project-root/src'
      // This makes sure it searches the 'src' directory for imports.
      path: [path.join(__dirname, 'src')], // Using path.join is often safer than path.resolve for directory paths
    }),
    // Your custom plugin comes AFTER imports are resolved
    relaxcss({ config: './relaxcss.config.js' }),
    autoprefixer(),
    // PurgeCSS usually goes last to remove unused CSS
    purgecss({
      content: [
        './public/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.vue',
      ],
      defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
      safelist: {
        standard: ['body', 'html'],
        greedy: [/^(sm:|md:|lg:|xl:|2xl:)/]
      },
    }),
  ],
};