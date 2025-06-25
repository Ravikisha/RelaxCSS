import postcss from 'postcss';
import relaxcss from '../src/index';

describe('RelaxCSS PostCSS Plugin', () => {
  it('generates CSS for basic utility classes', async () => {
    const input = '.foo { @apply p-4 m-2 text-blue-500; }';
    const result = await postcss([relaxcss()]).process(input, { from: undefined });
    expect(result.css).toMatch(/padding: 1rem/);
    expect(result.css).toMatch(/margin: 0.5rem/);
    expect(result.css).toMatch(/color: #3b82f6/);
  });

  it('supports arbitrary values', async () => {
    const input = '.bar { @apply bg-[#222] p-[10px]; }';
    const result = await postcss([relaxcss()]).process(input, { from: undefined });
    expect(result.css).toMatch(/background-color: #222/);
    expect(result.css).toMatch(/padding: 10px/);
  });

  it('applies responsive and pseudo variants', async () => {
    const input = '.baz { @apply sm:p-4 hover:bg-blue-500; }';
    const result = await postcss([relaxcss()]).process(input, { from: undefined });
    expect(result.css).toMatch(/@media \(min-width: 640px\)/);
    expect(result.css).toMatch(/:hover/);
  });

  it('supports dark mode and RTL', async () => {
    const input = '.darktest { @apply bg-black pl-4; }';
    const result = await postcss([relaxcss({ darkMode: 'class', rtl: true })]).process(input, { from: undefined });
    expect(result.css).toMatch(/.darktest/);
    expect(result.css).toMatch(/background-color: #000/);
    expect(result.css).toMatch(/padding-left: 1rem/);
    expect(result.css).toMatch(/padding-inline-end: 1rem/);
  });

  it('runs user plugin utilities', async () => {
    const input = '.fancy { @apply fancy-border; }';
    const result = await postcss([relaxcss()]).process(input, { from: undefined });
    expect(result.css).toMatch(/2px dashed magenta/);
  });
});
