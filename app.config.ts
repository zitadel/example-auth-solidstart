import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    server: {
      headers: {
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    },
  },
});
