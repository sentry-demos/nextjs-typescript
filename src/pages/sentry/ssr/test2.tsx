import { GetServerSidePropsResult } from 'next';

const Test2 = (): JSX.Element => <h1>SSR Test 02</h1>;

export async function getServerSideProps(): Promise<GetServerSidePropsResult<any>> {
  const doAsyncWork = () => Promise.reject(Error('SSR Test 02'));

  doAsyncWork();

  return { props: {} };
}

export default Test2;
