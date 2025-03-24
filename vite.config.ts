/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import zipPack from "vite-plugin-zip-pack";

export default defineConfig({
  base:"./",
  plugins: [
    react(),
    zipPack({
      inDir: 'build',
      outDir: 'dist'
    })
  ],
  test: {
    // ... Specify options here.
  },
  build: {
    outDir: "build",
    sourcemap: false
  }

})
