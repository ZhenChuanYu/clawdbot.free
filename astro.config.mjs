import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    react(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'zh-tw'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
