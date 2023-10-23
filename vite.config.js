import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bouboucle',
  plugins: [svelte()],
  server:{
    host: true,
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
});
