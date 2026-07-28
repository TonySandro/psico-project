import './utils/silentErrors';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import App from './App';
import theme from './theme';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initFrontendSentry, captureFrontendException } from './shared/observability/sentry';
import GlobalErrorBoundary from './components/ErrorBoundary';

initFrontendSentry();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      captureFrontendException(error, {
        queryKey: query.queryKey
      });
    }
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      captureFrontendException(error, {
        mutationKey: mutation.options.mutationKey
      });
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true
  });
};

const emotionCache = createEmotionCache();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            <SpeedInsights />
          </ThemeProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                window.location.reload();
              }
            });
          }
        });
      })
      .catch(() => { });
  });
}
