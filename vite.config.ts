import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    allowedHosts: true,
    headers: {
      // Avoid Safari / Docker bind-mount dev setups serving a cached stale index or module graph
      'Cache-Control': 'no-store',
    },
    watch: {
      // Required for file change detection when the app runs in Docker (bind mounts on macOS/Windows)
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
      interval: 300,
    },
  },
})
