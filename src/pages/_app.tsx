import React, { FC } from 'react'

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

const Noop: FC = ({ children }) => <>{children}</>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({ Component, pageProps, err }): JSX.Element {
  const Layout = Component.Layout || Noop

  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} err={err} />
    </Layout>
  )
}
