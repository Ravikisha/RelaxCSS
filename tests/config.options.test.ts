import relaxcss from '../src/index';
import postcss from 'postcss';
import {defaultConfig} from '../src/cli-watch';

describe('RelaxCSS Config Options', () => {
  it('respects custom theme colors and spacing', async () => {
    const input = '.foo { @apply text-primary p-1; }';
    // Import the default theme from your RelaxCSS package if available
    // import { defaultTheme } from '../src/defaultTheme'; // Uncomment and adjust path if needed

    const config = {
      ...defaultConfig,
      theme: {
        ...defaultConfig.theme,
        colors: { ...defaultConfig.theme.colors, primary: '#123456' },
        spacing: { ...defaultConfig.theme.spacing, 1: '2rem' },
      },
    };
    const result = await postcss([relaxcss(config)]).process(input, { from: undefined });
    expect(result.css).toMatch(/color: #123456/);
    expect(result.css).toMatch(/padding: 2rem/);
  });

  it('disables preflight if configured', async () => {
    const input = '.foo { @apply p-4; }';
    const config = { preflight: { enabled: false } };
    const result = await postcss([relaxcss(config)]).process(input, { from: undefined });
    expect(result.css).not.toMatch(/box-sizing/);
  });
});
