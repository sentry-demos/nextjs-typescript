import { GetServerSidePropsResult } from 'next';
import { withSentryGetServerSideProps } from '@sentry/nextjs';

const Test2 = (): JSX.Element => <h1>SSR Test 02</h1>;

export const getServerSideProps = withSentryGetServerSideProps(
  async (): Promise<GetServerSidePropsResult<any>> => {
    const doAsyncWork = () => Promise.reject(Error('SSR Test 02'));

    doAsyncWork();

    return { props: {} };
  },
  '/sentry/ssr/test2'
);

export default Test2;
