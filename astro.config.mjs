// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      allowedHosts:['devserver-preview--tiesse-ai.netlify.app']
    },
    preview: {
      allowedHosts:['devserver-preview--tiesse-ai.netlify.app']
    },
    plugins: [tailwindcss()],
  }
});
