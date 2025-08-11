// app.config.ts
import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';
var app_config_default = defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
export { app_config_default as default };
