import * as Sentry from '@sentry/nextjs';
import { withSentryGetServerSideProps } from '@sentry/nextjs';
import { GetServerSidePropsResult } from 'next';

const Test3 = (): JSX.Element => <h1>SSR Test 03</h1>;

export const getServerSideProps = withSentryGetServerSideProps(
  async (): Promise<GetServerSidePropsResult<any>> => {
    try {
      throw new Error('SSR Test 03');
    } catch (error) {
      Sentry.captureException(error);

      // Flushing before returning is necessary if deploying to Vercel, see
      // https://vercel.com/docs/platform/limits#streaming-responses
      await Sentry.flush(2000);
    }

    return { props: {} };
  },
  '/sentry/ssr/test3'
);

export default Test3;
