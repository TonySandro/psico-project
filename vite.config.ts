import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let proxyTarget = 'http://localhost:3000';
  if (env.VITE_API_URL) {
    try {
      proxyTarget = new URL(env.VITE_API_URL).origin;
    } catch (e) {
      proxyTarget = env.VITE_API_URL;
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