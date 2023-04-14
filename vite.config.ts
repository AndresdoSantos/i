import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'My fucking triggers',
        short_name: 'my-fucking-triggers',
        description: 'This is my fucking triggers',
        theme_color: '#ffffff',
        display: 'fullscreen',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
})
