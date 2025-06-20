// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
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