import * as Sentry from '@sentry/react';

let isFrontendSentryInitialized = false;

export function initFrontendSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const environment = import.meta.env.MODE || 'development';

  if (!dsn) {
    console.info('VITE_SENTRY_DSN not provided. Frontend Sentry tracking disabled.');
    return;
  }

  try {
    Sentry.init({
      dsn,
      environment,
      release: appVersion,
      ignoreErrors: [
        'Network Error',
        'AbortError',
        'ResizeObserver loop limit exceeded',
        'Failed to fetch',
        'Load failed'
      ],
      beforeSend(event) {
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['authorization'];
          delete event.request.headers['cookie'];
        }
        return event;
      }
    });

    isFrontendSentryInitialized = true;
  } catch (error) {
    console.error('Failed to initialize Sentry on frontend:', error);
  }
}

export function setFrontendUser(user: { id: string; email?: string } | null): void {
  if (!isFrontendSentryInitialized) return;

  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email
    });
  } else {
    Sentry.setUser(null);
  }
}

export function captureFrontendException(error: unknown, context?: Record<string, unknown>): void {
  if (!isFrontendSentryInitialized) return;

  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

export { Sentry };
