const postcss = require('postcss');

// relaxcss.config.js
module.exports = {
  plugins: [
    function ({ addUtilities, config }) {
      addUtilities({
        "fancy-border": () => [
          // You can use the config if needed
          new config.postcss.Declaration({ prop: "border", value: "2px dashed magenta" }),
          new config.postcss.Declaration({ prop: "border-radius", value: "1rem" }),
        ],
      });
    },
  ],
  fileExtensions: ["css", "html", "js", "jsx", "ts", "tsx", "vue", "svelte"],
  theme: {
    colors: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      tertiary: '#805ad5', // <--- ADD THIS COLOR
      'red-500': '#ef4444',
      'blue-500': '#3b82f6',
      danger: '#e3342f',
      success: '#38c172',
      gray: '#6b7280'
    },
    spacing: {
      '0': '0rem',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  variants: {
    responsive: ['sm', 'md', 'lg', 'xl', '2xl'],
    pseudoClass: ['hover', 'focus', 'active', 'disabled', 'first', 'last']
  }
};