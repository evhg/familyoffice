import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/dev/') && !page.endsWith('/404/'),
    }),
  ],
  vite: {
    ssr: {
      external: ['@resvg/resvg-js'],
    },
  },
});
