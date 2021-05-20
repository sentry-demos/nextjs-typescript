import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { Prefetcher } from '@layer0/prefetch/sw';

skipWaiting();
clientsClaim();
// eslint-disable-next-line
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
