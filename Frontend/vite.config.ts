import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 5173,
    // Forward /api calls to the backend (localhost when run directly, the
    // backend container when run via docker compose)
    proxy: {
      '/api': process.env.API_PROXY_TARGET ?? 'http://localhost:8000',
    },
    // File-change events don't always cross Docker bind mounts, so poll there
    watch: process.env.VITE_USE_POLLING === 'true'
      ? { usePolling: true, interval: 100 }
      : undefined,
  },
})
