import path from "path"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // ✅ Proxy para /auth (sin /api)
      '/auth': {
        target: 'http://ecohouse-env.eba-vay8q3u6.us-east-1.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (req) => {
            console.log('🔄 Auth proxy:', req.method, req.url);
          });
        }
      },
      // ✅ Proxy para /api
      '/api': {
        target: 'http://ecohouse-env.eba-vay8q3u6.us-east-1.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (req) => {
            console.log('🔄 API proxy:', req.method, req.url);
          });
        }
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ... tu configuración existente
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'radix-vendor': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          'state-vendor': [
            '@tanstack/react-query',
            'zustand',
          ],
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],
          'data-viz-vendor': [
            'recharts',
            '@tanstack/react-table',
          ],
          'utils-vendor': [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'lucide-react',
            'sonner',
            'next-themes',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})