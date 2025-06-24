<p align="center">
<img src="https://ravikisha.github.io/assets/relaxcss_logo.png" alt="RelaxCSS Logo" width="200">
</p>
<h1 align="center">RelaxCSS</h1>

<p float="left" align="center">
<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="Typescript Logo" />
<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" alt="JavaScript Logo" />
<img src="https://shields.io/badge/PostCSS-000000?logo=PostCSS&logoColor=FFF&style=flat-square" alt="PostCSS Logo" />
<img src="https://shields.io/badge/Node.js-339933?logo=Node.js&logoColor=FFF&style=flat-square" alt="Node.js Logo" />
<img src="https://shields.io/badge/License-MIT-blue?style=flat-square" alt="MIT License" />

</p>

A next-generation, Tailwind-like JIT CSS/PostCSS plugin with a powerful plugin system, support for arbitrary values, variants (including dark mode and RTL), efficient watch mode, and CSS variable theme support.

RelaxCSS can be used as a **PostCSS plugin** (recommended for most build pipelines) or as a standalone CLI tool.

---

## PostCSS Plugin Usage

RelaxCSS is a drop-in [PostCSS](https://postcss.org/) plugin. It works with PostCSS v8+ and integrates with any PostCSS-based build system (Webpack, Vite, Parcel, etc).

```js
// postcss.config.js
const relaxcss = require('relaxcss');

module.exports = {
  plugins: [
    require('postcss-import'), // must be first
    relaxcss({
      // custom config here
    }),
    require('autoprefixer'),
    // ...
  ]
};
```

- Supports all RelaxCSS features: JIT utilities, plugins, variants, dark mode, RTL, CSS variables, and more.
- Use your `relaxcss.config.js` for custom configuration.
- Compatible with PostCSS v8+ and all major build tools.

---

## Table of Contents
- [PostCSS Plugin Usage](#postcss-plugin-usage)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [1. As a CLI (recommended for most projects)](#1-as-a-cli-recommended-for-most-projects)
  - [2. As a PostCSS Plugin](#2-as-a-postcss-plugin)
- [Usage as CLI](#usage-as-cli)
    - [CLI Options](#cli-options)
- [Usage as PostCSS Plugin](#usage-as-postcss-plugin)
- [Configuration](#configuration)
  - [Config Options](#config-options)
    - [Example `relaxcss.config.js`](#example-relaxcssconfigjs)
  - [Theme](#theme)
    - [Example](#example)
  - [Variants](#variants)
    - [Example](#example-1)
  - [Dark Mode](#dark-mode)
  - [RTL Support](#rtl-support)
  - [Preflight](#preflight)
  - [Plugin System](#plugin-system)
    - [Example](#example-2)
- [Arbitrary Values](#arbitrary-values)
- [Variants \& Responsive Utilities](#variants--responsive-utilities)
- [CSS Variable Theme Support](#css-variable-theme-support)
- [@apply and Utility Extraction](#apply-and-utility-extraction)
- [Production Usage \& PurgeCSS](#production-usage--purgecss)
- [Advanced Examples](#advanced-examples)
  - [Custom Utility Plugin](#custom-utility-plugin)
  - [Arbitrary Value Utility](#arbitrary-value-utility)
  - [Responsive and Variant Utilities](#responsive-and-variant-utilities)
- [FAQ](#faq)
  - [Why use RelaxCSS as a PostCSS plugin?](#why-use-relaxcss-as-a-postcss-plugin)
- [License](#license)

---

## Features
- **JIT utility generation** (like Tailwind, but faster)
- **Plugin system** for user utilities
- **Arbitrary value support** (e.g. `bg-[#222]`, `p-[4px]`)
- **Variants**: responsive, pseudo, dark mode (class/media/both), RTL
- **CSS variable theme support** (theme values as CSS custom properties)
- **Efficient CLI**: npx/Node CLI for project-wide class extraction and CSS generation
- **@apply** and class extraction from HTML/JSX/Vue/Svelte
- **Preflight**: base styles with fine-grained control

---

## Installation

```sh
npm install relaxcss --save-dev
# or
yarn add relaxcss --dev
```

---

## Quick Start

### 1. As a CLI (recommended for most projects)

```sh
npx relaxcss --out dist/output.css
```
- Scans your `src/` directory for all HTML, JS, TS, JSX, TSX, Vue, and Svelte files.
- Extracts all class names and generates CSS for all used classes.
- Use `--watch` for watch mode (if implemented).

### 2. As a PostCSS Plugin

In your `postcss.config.js`:

```js
const relaxcss = require('relaxcss');

module.exports = {
  plugins: [
    require('postcss-import'), // must be first
    relaxcss({
      // custom config here
    }),
    require('autoprefixer'),
    // ...
  ]
};
```

---

## Usage as CLI

```sh
npx relaxcss --out dist/output.css
```
- By default, scans `src/**/*.{css,html,js,jsx,ts,tsx,vue,svelte}`.
- Extracts all class names and @apply utilities.
- Generates CSS for all found classes.
- Supports custom config via `relaxcss.config.js`.

#### CLI Options
- `--out <file>`: Output CSS file (default: `dist/output.css`)
- `--watch`: Watch mode (auto-rebuild on file changes)
- `--config <file>`: Path to custom config (default: `relaxcss.config.js`)

---

## Usage as PostCSS Plugin

```js
const relaxcss = require('relaxcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    relaxcss({
      // config options
    }),
    require('autoprefixer'),
  ]
};
```

---

## Configuration

RelaxCSS can be configured via a `relaxcss.config.js` file or by passing an options object to the plugin.

### Config Options

| Option         | Type      | Default      | Description |
|----------------|-----------|--------------|-------------|
| `theme`        | Object    | See below    | Design tokens (colors, spacing, etc.) |
| `variants`     | Object    | See below    | Responsive breakpoints, pseudo-classes |
| `plugins`      | Array     | []           | User utility plugins |
| `preflight`    | Object    | `{ enabled: true }` | Base styles, overrides, disables |
| `darkMode`     | String    | `'class'`    | `'class'`, `'media'`, or `'both'` |
| `rtl`          | Boolean   | `false`      | Enable RTL logical property support |
| `fileExtensions`| Array    | `["css","html","js","jsx","ts","tsx","vue","svelte"]` | Extensions to scan in CLI |

#### Example `relaxcss.config.js`
```js
module.exports = {
  theme: {
    colors: {
      primary: '#0070f3',
      gray: {
        100: '#f3f4f6',
        900: '#111827',
      },
    },
    spacing: {
      1: '0.25rem',
      2: '0.5rem',
      4: '1rem',
    },
    // ...
  },
  variants: {
    responsive: ['sm', 'md', 'lg', 'xl', '2xl'],
    pseudoClasses: ['hover', 'focus', 'active', 'disabled'],
  },
  plugins: [
    function({ addUtilities, config }) {
      addUtilities({
        'fancy-border': () => [
          { prop: 'border', value: '2px dashed magenta' },
        ],
      });
    },
  ],
  preflight: {
    enabled: true,
    disableSections: ['box-sizing', 'list-style'],
    overrides: 'body { background: #fafafa; }',
  },
  darkMode: 'class', // or 'media' or 'both'
  rtl: false,
  fileExtensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'vue', 'svelte'],
};
```

---

### Theme
- `theme` is an object of design tokens: `colors`, `spacing`, `fontSize`, `fontWeight`, `lineHeight`, `boxShadow`, `zIndex`, `opacity`, `borderRadius`, `borderWidth`, `gridTemplateColumns`, `gridTemplateRows`, `flex`, `transitionProperty`, `transitionDuration`, `transitionTimingFunction`, `maxWidth`, `maxHeight`, etc.
- All theme values are exported as CSS custom properties (variables) for easy use in utilities and custom CSS.

#### Example
```js
module.exports = {
  theme: {
    colors: {
      primary: '#0070f3',
      gray: { 100: '#f3f4f6', 900: '#111827' },
    },
    spacing: { 1: '0.25rem', 2: '0.5rem', 4: '1rem' },
    // ...
  },
};
```

---

### Variants
- `responsive`: Array of breakpoint keys (e.g. `sm`, `md`, `lg`, ...)
- `pseudoClasses`: Array of pseudo-class variants (e.g. `hover`, `focus`, `active`, ...)

#### Example
```js
variants: {
  responsive: ['sm', 'md', 'lg', 'xl', '2xl'],
  pseudoClasses: ['hover', 'focus', 'active', 'disabled'],
}
```

---

### Dark Mode
- `darkMode`: `'class'` (default), `'media'`, or `'both'`
  - `'class'`: Uses `.dark` class for dark mode
  - `'media'`: Uses `@media (prefers-color-scheme: dark)`
  - `'both'`: Supports both strategies

---

### RTL Support
- `rtl`: `true` or `false` (default)
- When enabled, logical properties (e.g. `margin-inline-start`) are used for margin/padding utilities, and direction-aware utilities are generated.

---

### Preflight
- `preflight.enabled`: Enable/disable base styles
- `preflight.disableSections`: Array of base style sections to disable (e.g. `['box-sizing', 'list-style']`)
- `preflight.overrides`: Custom CSS to inject at the top of the output

---

### Plugin System
- Add custom utilities via the `plugins` array.
- Each plugin is a function receiving `{ addUtilities, config }`.
- Use `addUtilities({ 'class-name': (config) => [ { prop, value }, ... ] })` to register utilities.

#### Example
```js
plugins: [
  function({ addUtilities, config }) {
    addUtilities({
      'fancy-border': () => [
        { prop: 'border', value: '2px dashed magenta' },
      ],
    });
  },
]
```

---

## Arbitrary Values
- Use square brackets for arbitrary values: `bg-[#222]`, `p-[4px]`, `w-[72vw]`, etc.
- Works for colors, spacing, width, height, and more.

---

## Variants & Responsive Utilities
- Prefix classes with breakpoints or pseudo-classes: `sm:bg-blue-500`, `hover:text-red-500`, `dark:bg-black`, `rtl:pl-4`.
- Combine multiple variants: `sm:hover:bg-blue-500`, `dark:focus:ring-2`.

---

## CSS Variable Theme Support
- All theme values are exported as CSS custom properties (e.g. `--color-primary`, `--spacing-4`).
- Utilities use these variables for easy theming and overrides.

---

## @apply and Utility Extraction
- RelaxCSS extracts all class names from your source files, including those used in `@apply` in CSS.
- All used classes are included in the generated CSS.

---

## Production Usage & PurgeCSS
- For production, use [PurgeCSS](https://purgecss.com/) to remove unused CSS.
- Example `postcss.config.js`:

```js
const relaxcss = require('relaxcss');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('postcss-import'),
    relaxcss({ config: './relaxcss.config.js' }),
    require('autoprefixer'),
    purgecss({
      content: [
        './public/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.vue',
      ],
      defaultExtractor: content => content.match(/[^\s"'`<>]+/g) || [],
      safelist: {
        standard: ['body', 'html'],
        greedy: [/^(sm:|md:|lg:|xl:|2xl:)/],
      },
    }),
  ],
};
```

---

## Advanced Examples

### Custom Utility Plugin
```js
// relaxcss.config.js
module.exports = {
  plugins: [
    function({ addUtilities, config }) {
      addUtilities({
        'btn-primary': () => [
          { prop: 'background', value: config.theme.colors.primary },
          { prop: 'color', value: '#fff' },
          { prop: 'padding', value: config.theme.spacing[2] },
        ],
      });
    },
  ],
};
```

### Arbitrary Value Utility
```html
<div class="bg-[#222] p-[4px] w-[72vw]"></div>
```

### Responsive and Variant Utilities
```html
<div class="sm:bg-blue-500 hover:text-red-500 dark:bg-black rtl:pl-4"></div>
```

---

## FAQ

### Why use RelaxCSS as a PostCSS plugin?

- **Seamless integration**: Works with any PostCSS-based build system (Webpack, Vite, Parcel, etc).
- **Automatic class extraction**: Processes your CSS and source files to generate only the CSS you use.
- **Full feature set**: All RelaxCSS features (JIT, plugins, variants, dark mode, RTL, CSS variables, etc) are available in plugin mode.
- **Production ready**: Combine with PurgeCSS and other PostCSS plugins for optimal output.

---

## License
MIT
