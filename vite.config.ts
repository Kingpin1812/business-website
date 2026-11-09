import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The build-time prerender (src/entry-server.tsx) bundles every dependency so Node can run it directly.
  ssr: { noExternal: true },
  build: {
    // The Babylon.js 3D chunk is large but only loaded on demand (dynamic import in DoorShowcase).
    chunkSizeWarningLimit: 1600,
  },
})
