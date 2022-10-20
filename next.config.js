/* eslint-disable no-param-reassign */
const { withLayer0, withServiceWorker } = require('@layer0/next/config');
const { withSentryConfig } = require('@sentry/nextjs');
// const withPlugins = require('next-compose-plugins');

const {
  NEXT_PUBLIC_APP_STAGE,
  NEXT_PUBLIC_FEATURE_SOURCE_MAP,
  NEXT_PUBLIC_FEATURE_WIDEN_SOURCE_MAP,
} = process.env;

const basePath = '';
const sourceMapping = NEXT_PUBLIC_FEATURE_SOURCE_MAP === 'true';
const widenSourceMaps = sourceMapping && NEXT_PUBLIC_FEATURE_WIDEN_SOURCE_MAP === 'true';

const nextConfig = {
  future: {
    webpack5: true,
  },
  productionBrowserSourceMaps: sourceMapping,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_APP_STAGE,
  },
  env: {
    NEXT_PUBLIC_APP_STAGE: process.env.NEXT_PUBLIC_APP_STAGE,
  },

  basePath,
  poweredByHeader: false,
};

module.exports = withSentryConfig(
  withLayer0(
    withServiceWorker({
      ...nextConfig,
      target: 'experimental-serverless-trace',
      // Output source maps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Edgio developer console.
      layer0SourceMaps: true,
      sentry: {
        disableServerWebpackPlugin: !sourceMapping,
        disableClientWebpackPlugin: !sourceMapping,
        hideSourceMaps: true,
        autoInstrumentServerFunctions: true,
        widenClientFileUpload: widenSourceMaps,
      },
    })
  )
);
