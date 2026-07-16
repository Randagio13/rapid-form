import { defineConfig } from 'tsdown';

export default defineConfig({
  treeshake: true,
  sourcemap: true, // source map is only available in prod
  clean: true, // clean dist before build
  dts: true, // generate dts file for main module
  format: ['cjs', 'esm'], // generate cjs and esm files
  fixedExtension: false, // emit .js for esm (matching package.json exports)
  minify: true,
  target: 'es2020',
  entry: ['src/index.ts', 'src/resolvers/zod.ts', 'src/resolvers/yup.ts']
});
