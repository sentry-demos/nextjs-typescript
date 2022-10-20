/* eslint-disable no-param-reassign */
const { withLayer0, withServiceWorker } = require('@layer0/next/config');
const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');

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

const plugins = [];
if (process.env.LAYER0 === 'true') {
  plugins.push([withLayer0, { layer0SourceMaps: false }], [withServiceWorker]);
}

module.exports = withPlugins(
  [
    [_nextConfig => _nextConfig, { target: 'experimental-serverless-trace' }],
    ...plugins,
    [
      _nextConfig => _nextConfig,
      {
        sentry: {
          disableServerWebpackPlugin: !sourceMapping,
          disableClientWebpackPlugin: !sourceMapping,
          hideSourceMaps: true,
          autoInstrumentServerFunctions: false,
          widenClientFileUpload: widenSourceMaps,
        },
      },
    ],
    [withSentryConfig],
  ],
  nextConfig
);
