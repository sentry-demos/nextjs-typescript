// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const {
  NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_APP_STAGE,
  NEXT_PUBLIC_SENTRY_SAMPLE_RATE,
  NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE,
} = process.env;

Sentry.init({
  enabled: !['development'].includes(NEXT_PUBLIC_APP_STAGE) && NEXT_PUBLIC_SENTRY_DSN,
  environment: NEXT_PUBLIC_APP_STAGE,
  dsn: NEXT_PUBLIC_SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  sampleRate: +NEXT_PUBLIC_SENTRY_SAMPLE_RATE || 1.0,
  tracesSampleRate: +NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE || 1.0,
  ignoreErrors: [
    // 'TypeError: Failed to fetch', // chrome - any network error
    // 'TypeError: Load failed', // ios - any network error
    // 'TypeError: NetworkError when attempting to fetch resource.', // firefox - any network error
    // 'Error: ResizeObserver loop limit exceeded', // https://github.com/WICG/resize-observer/issues/38
  ],
  denyUrls: [
    // /imgs\.ebit\.com\.br/i, // stop sending errors caused by files in this domain
  ],
  // debug: true,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
