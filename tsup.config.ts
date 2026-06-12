import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', '@rekurt/openkline-core'],
  jsx: 'automatic',
});
