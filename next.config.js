/* eslint-disable no-param-reassign */

const withPlugins = require('next-compose-plugins');

const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map',
});

// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NEXT_PUBLIC_APP_STAGE,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env;

// The Sentry WebpackPlugin is used to upload sourcemaps at buildtime and
// it looks for an environment variable specifically SENTRY_DSN,
// so we need to map it so it works properly.
// See:
// https://github.com/getsentry/sentry-webpack-plugin
// https://docs.sentry.io/cli/configuration
process.env.SENTRY_DSN = SENTRY_DSN;

const envs = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

const basePath = '';
const nextConfig = {
  future: {
    webpack5: true,
  },
  productionBrowserSourceMaps: true,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    SENTRY_DSN,
    NEXT_PUBLIC_APP_STAGE,
  },
  env: {
    NEXT_PUBLIC_APP_STAGE: process.env.NEXT_PUBLIC_APP_STAGE,
  },
  // Font & Image Optimization See: https://github.com/vercel/next.js/pull/15875
//   experimental: {
//     optimizeFonts: true,
//     optimizeImages: false,
//   },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, './src/styles')],
  //   prependData: `
  //     @import './src/styles/global.scss';
  //   `,
  // },
//   images: {
//     domains: [
//       'images.madeiramadeira.com.br',
//       'www.datocms-assets.com',
//       'cdn2.madeiramadeira.com.br',
//     ],
//     deviceSizes: [320, 420, 768, 1024, 1200],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
  async headers() {
    const headers = [
      // {
      //   source: '/(.*)',
      //   headers: [
      //     {
      //       key: 'Feature-Policy',
      //       value: 'ch-viewport-width https://4dva7pwz.cdn.imgeng.in; ch-width https://4dva7pwz.cdn.imgeng.in; ch-dpr https://4dva7pwz.cdn.imgeng.in; ch-device-memory https://4dva7pwz.cdn.imgeng.in; ch-ect https://4dva7pwz.cdn.imgeng.in; ch-downlink https://4dva7pwz.cdn.imgeng.in',
      //     },
      //   ],
      // },
    ];

    return headers;
  },
  
  webpack: (config, { isServer, buildId, webpack }) => {
    const releaseVersion = VERCEL_GITHUB_COMMIT_SHA || buildId;

    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(isServer.toString()),
        'process.env.NEXT_PUBLIC_COMMIT_SHA': JSON.stringify(releaseVersion),
      })
    );

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.

    if (
      releaseVersion &&
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      NEXT_PUBLIC_APP_STAGE !== envs.DEVELOPMENT
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~${basePath}/_next`,
          release: releaseVersion,
          deploy: {
            env: NEXT_PUBLIC_APP_STAGE,
          },
        })
      );
    }

    return config;
  },
  basePath,
  poweredByHeader: false,
};

module.exports = withPlugins(
  [
    [withSourceMaps]
  ],
  nextConfig
);