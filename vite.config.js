import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import clientConfig from './movieAppClient.json' with { type: 'json' }

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/users': {
        target: clientConfig.url,
        changeOrigin: true,
      },
      '/movies': {
        target: clientConfig.url,
        changeOrigin: true,
      },
    },
  },
})
