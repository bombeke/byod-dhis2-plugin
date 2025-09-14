/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import zipPack from "vite-plugin-zip-pack";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base:"./",
  plugins: [
    tailwindcss(),
    react(),
    zipPack({
      inDir: 'build',
      outDir: 'dist'
    })
  ],
  build: {
    outDir: "build",
    sourcemap: false
  }

})
