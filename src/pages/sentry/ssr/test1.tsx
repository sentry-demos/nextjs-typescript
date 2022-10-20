import { GetServerSidePropsResult } from 'next';
import { withSentryGetServerSideProps } from '@sentry/nextjs';

const Test1 = (): JSX.Element => <h1>SSR Test 01</h1>;

export const getServerSideProps = withSentryGetServerSideProps(
  async (): Promise<GetServerSidePropsResult<any>> => {
    return Promise.reject(Error('SSR Test 01'));
  },
  '/sentry/ssr/test1'
);

export default Test1;
