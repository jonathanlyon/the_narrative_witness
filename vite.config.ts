import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const writingDirectory = path.resolve(__dirname, 'writing');
  const writingEntries = fs.existsSync(writingDirectory)
    ? fs
        .readdirSync(writingDirectory, {withFileTypes: true})
        .filter((entry) => entry.isDirectory())
        .reduce<Record<string, string>>((entries, entry) => {
          const htmlPath = path.join(writingDirectory, entry.name, 'index.html');
          if (fs.existsSync(htmlPath)) {
            entries[`writing-${entry.name}`] = htmlPath;
          }
          return entries;
        }, {})
    : {};

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          // Hidden book pre-order page + its checkout satellites (mvp/book-page).
          book: path.resolve(__dirname, 'book.html'),
          'thank-you': path.resolve(__dirname, 'thank-you.html'),
          'preorder-terms': path.resolve(__dirname, 'preorder-terms.html'),
          ...writingEntries,
        },
      },
    },
  };
});
