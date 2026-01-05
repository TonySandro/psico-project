import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let proxyTarget = 'http://localhost:3000';
  if (env.VITE_API_URL) {
    let apiUrl = env.VITE_API_URL;
    if (!apiUrl.startsWith('http') && !apiUrl.startsWith('/')) {
      apiUrl = `https://${apiUrl}`;
    }

    try {
      proxyTarget = new URL(apiUrl).origin;
    } catch (e) {
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
    }
  };
});