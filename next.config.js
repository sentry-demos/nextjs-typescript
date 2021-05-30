/* eslint-disable no-param-reassign */
const { withLayer0, withServiceWorker } = require('@layer0/next/config')
// const withPlugins = require('next-compose-plugins')
const { withSentryConfig } = require('@sentry/nextjs')
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map',
})

const {
  NEXT_PUBLIC_APP_STAGE,
  VERCEL_GITHUB_COMMIT_SHA,
} = process.env

const basePath = ''
const nextConfig = {
  future: {
    webpack5: true,
  },
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

  async headers() {
    return []
  },

  webpack: (config, { isServer, buildId, webpack }) => {
    const releaseVersion = VERCEL_GITHUB_COMMIT_SHA || buildId

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(isServer.toString()),
        'process.env.NEXT_PUBLIC_COMMIT_SHA': JSON.stringify(releaseVersion),
      })
    )

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.

    return config
  },
  basePath,
  poweredByHeader: false,
}
const SentryWebpackPluginOptions = {}

module.exports = withSentryConfig(
  withLayer0(
    withServiceWorker(
      withSourceMaps({
        ...nextConfig,
      })
    )
  ),
  SentryWebpackPluginOptions
)

// module.exports = withPlugins([[withSourceMaps]], nextConfig)
