// // src/__tests__/plugin.test.ts
// import postcss from 'postcss';
// import plugin from '../index'; // Adjust path if your index.ts is elsewhere

// async function run(input: string, output: string, opts = {}) {
//   let result = await postcss([plugin(opts)]).process(input, { from: undefined });
//   // Trim the output to handle leading/trailing newlines in expected multiline strings
//   expect(result.css.trim()).toEqual(output.trim());
//   expect(result.warnings()).toHaveLength(0);
// }

// describe('RelaxCSS PostCSS Plugin', () => {

//   it('should process a basic utility class', async () => {
//     const input = '.test { @apply text-blue-500; }';
//     const output = `
// .test {
//   color: #3b82f6;
// }
// `.trim(); // Updated to match PostCSS formatting
//     await run(input, output, {});
//   });

//   it('should apply padding-x (px-4)', async () => {
//     const input = '.box { @apply px-4; }';
//     const output = `
// .box {
//   padding-left: 1rem;
//   padding-right: 1rem;
// }
// `.trim(); // Updated to match PostCSS formatting
//     await run(input, output, {});
//   });

//   it('should apply margin-x auto (mx-auto)', async () => {
//     const input = '.center { @apply mx-auto; }';
//     const output = `
// .center {
//   margin-left: auto;
//   margin-right: auto;
// }
// `.trim(); // Updated to match PostCSS formatting
//     await run(input, output, {});
//   });

//   it('should apply responsive padding (sm:px-6)', async () => {
//     const input = '.card { @apply sm:px-6; }';
//     const output = `
// .card { }
// @media (min-width: 640px) {
//   .card {
//     padding-left: 1.5rem;
//     padding-right: 1.5rem;
//   }
// }
// `.trim(); // Updated to match PostCSS formatting
//     await run(input, output, {});
//   });

//   it('should apply multiple utilities with variants', async () => {
//     const input = '.btn { @apply bg-blue-500 hover:bg-blue-600 sm:px-4 md:py-2; }';
//     const output = `
// .btn {
//   background-color: #3b82f6;
// }
// .btn:hover {
//   background-color: #2563eb;
// }
// @media (min-width: 640px) {
//   .btn {
//     padding-left: 1rem;
//     padding-right: 1rem;
//   }
// }
// @media (min-width: 768px) {
//   .btn {
//     padding-top: 0.5rem;
//     padding-bottom: 0.5rem;
//   }
// }
// `.trim(); // Updated to match PostCSS formatting
//     await run(input, output, {});
//   });

//   // Add more tests for other utilities, responsive variants, pseudo-classes, etc.
// });