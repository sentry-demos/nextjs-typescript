// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from '@layer0/core/router';
import { nextRoutes } from '@layer0/next';

export const ONE_MINUTE = 60;
export const FIFTEEN_MINUTES = 15 * ONE_MINUTE;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_MONTH = 30 * ONE_DAY;
export const ONE_YEAR = 12 * ONE_MONTH;

export default new Router()
  .get('/service-worker.js', ({ cache, serviceWorker }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_YEAR,
      },
      browser: {
        maxAgeSeconds: 0,
      },
    });
    serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes) // automatically adds routes for all files under /pages
  .fallback(({ proxy }) => proxy('origin'));
