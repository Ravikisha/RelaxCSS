// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/cli.ts', // skip CLI entry
    '!src/cli-watch.ts', // skip CLI logic for coverage
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  // Update ts-jest configuration here
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Ensure this points to your project's tsconfig
    }],
  },
  // Remove the old 'globals' section for ts-jest
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
};