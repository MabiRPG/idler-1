import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from "path";

export default defineConfig(() => {
  return {
    base: '/idler-1/',
    build: {
      outDir: 'build',
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [autoprefixer],
      },
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    plugins: [react()],
  };
});
