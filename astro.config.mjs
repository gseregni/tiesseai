// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      port: 3000,
      allowedHosts:true
    },
    preview: {
      
      allowedHosts:true
    },
    plugins: [tailwindcss()],
  }
});
