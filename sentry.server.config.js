// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
  // debug: true,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
