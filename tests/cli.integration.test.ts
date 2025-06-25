import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('RelaxCSS CLI', () => {
  const testInput = path.join(__dirname, 'cli-test-input.css');
  const testOutput = path.join(__dirname, 'cli-test-output.css');

  beforeAll(() => {
    fs.writeFileSync(testInput, '.foo { @apply p-4 m-2 text-blue-500; }', 'utf8');
  });

  afterAll(() => {
    fs.unlinkSync(testInput);
    if (fs.existsSync(testOutput)) fs.unlinkSync(testOutput);
  });

  if (!fs.existsSync(path.join(__dirname, './dist/cli.js'))) {
    it.skip('CLI integration (skipped, not built)', () => {});
  } else {
    it('generates CSS from CLI', () => {
      execSync(`node ../dist/cli.js --out ${testOutput}`);
      const css = fs.readFileSync(testOutput, 'utf8');
      expect(css).toMatch(/padding: 1rem/);
      expect(css).toMatch(/margin: 0.5rem/);
      expect(css).toMatch(/color: #3b82f6/);
    });
  }
});
