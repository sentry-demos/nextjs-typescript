import { Metrics } from '@layer0/rum';
import type { AppProps } from 'next/app';
import React, { FC } from 'react';

if (process.env.NEXT_PUBLIC_FEATURE_FLAG_RUM === 'true') {
  new Metrics({
    token: process.env.NEXT_PUBLIC_RUM_TOKEN,
  }).collect();
}

interface MyAppProps extends AppProps {
  err?: (Error & { statusCode?: number }) | null;
  Component: AppProps['Component'];
}

const Noop: FC = ({ children }: any) => <>{children}</>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyApp({ Component, pageProps, err }: MyAppProps): JSX.Element {
  const Layout = (Component as any).Layout || Noop;

  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} err={err} />
    </Layout>
  );
}
