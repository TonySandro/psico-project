import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let proxyTarget = env.VITE_API_URL;
  if (env.VITE_API_URL) {
    let apiUrl = env.VITE_API_URL;
    if (!apiUrl.startsWith('http') && !apiUrl.startsWith('/')) {
      apiUrl = `https://${apiUrl}`;
    }

    try {
      proxyTarget = new URL(apiUrl).origin;
    } catch (_) {
      proxyTarget = apiUrl;
    }
  }

  return {
    plugins: [
      react(),
      svgr()
    ],
    css: {
      postcss: './postcss.config.js'
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@mui')) {
                return 'vendor-mui';
              }
              if (id.includes('@tiptap')) {
                return 'vendor-tiptap';
              }
              if (id.includes('recharts') || id.includes('d3')) {
                return 'vendor-charts';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  };
});