// app.config.ts
// noinspection JSUnusedGlobalSymbols

import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

const app_config_default = defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
export { app_config_default as default };
