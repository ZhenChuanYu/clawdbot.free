import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3003,
    open: true,
    host: true
  },
  preview: {
    port: 3003,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        zh: path.resolve(__dirname, 'index-zh.html'),
        es: path.resolve(__dirname, 'index-es.html'),
        ja: path.resolve(__dirname, 'index-ja.html'),
        ko: path.resolve(__dirname, 'index-ko.html'),
        fr: path.resolve(__dirname, 'index-fr.html'),
        de: path.resolve(__dirname, 'index-de.html')
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'ui-vendor': ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
