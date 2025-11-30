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
        de: path.resolve(__dirname, 'index-de.html'),
        pt: path.resolve(__dirname, 'index-pt.html'),
        ru: path.resolve(__dirname, 'index-ru.html'),
        it: path.resolve(__dirname, 'index-it.html'),
        ar: path.resolve(__dirname, 'index-ar.html'),
        hi: path.resolve(__dirname, 'index-hi.html'),
        tr: path.resolve(__dirname, 'index-tr.html'),
        vi: path.resolve(__dirname, 'index-vi.html'),
        th: path.resolve(__dirname, 'index-th.html'),
        id: path.resolve(__dirname, 'index-id.html'),
        nl: path.resolve(__dirname, 'index-nl.html'),
        pl: path.resolve(__dirname, 'index-pl.html'),
        sv: path.resolve(__dirname, 'index-sv.html'),
        no: path.resolve(__dirname, 'index-no.html'),
        da: path.resolve(__dirname, 'index-da.html'),
        fi: path.resolve(__dirname, 'index-fi.html'),
        'zh-tw': path.resolve(__dirname, 'index-zh-tw.html')
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
