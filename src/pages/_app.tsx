import React, { FC } from 'react'

// import { css } from '@design/stitches.config';
// import { reset } from 'stitches-reset';
// import { ManagedUIContext } from '@app/ui/context';
// import previewModeContext from 'contexts/previewModeContext';

import { init as initSentry } from '@helpers/monitoring/sentry'
// import { DefaultSeo } from 'next-seo';

// import your default seo configuration
// import Analytics from 'analytics';
// import segmentPlugin from '@analytics/segment';

// import { AnalyticsProvider } from 'use-analytics';
// import Router from 'next/router';

// import envs from 'helpers/envs';

// import SEO from '../next-seo.config';

initSentry()

/**
 * WDYR (why-did-you-render) helps locate unnecessary re-renders and fix them
 * Applied in development environment, on the frontend only
 *
 * @see https://github.com/welldone-software/why-did-you-render
 */
if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line global-require
    const whyDidYouRender = require('@welldone-software/why-did-you-render')

    whyDidYouRender(React, {
      trackAllPureComponents: true,
      trackHooks: true,
      logOwnerReasons: true,
      collapseGroups: true,
    })
  }
}

// const analytics = Analytics({
//   app: 'mm-webstore',
//   debug: process.env.NEXT_PUBLIC_APP_STAGE === envs.DEVELOPMENT,
//   plugins: [
//     segmentPlugin({
//       writeKey: 'SfXujuzsZXCG4SGt9xYyYF3jt3fIEHzi',
//       syncAnonymousId: true,
//       // customScriptSrc: '/vendor/segment/index.',
//     }),
//   ],
// });

// Notice how we track pageview when route is changed
// Router.events.on('routeChangeComplete', url => {
//   analytics.page(url);
// });

// const globalStyles = css.global({
//   ...reset,
//   body: {
//     background: '$canvas',
//   },
// });

const Noop: FC = ({ children }) => <>{children}</>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps, err }): JSX.Element {
  const Layout = Component.Layout || Noop
  //   const { preview = false, previewData = null } = pageProps;

  // call here
  //   globalStyles();

  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} err={err} />
    </Layout>
  )
}
