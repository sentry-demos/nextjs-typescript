import { GetServerSidePropsResult } from 'next';

const Test1 = (): JSX.Element => <h1>SSR Test 01</h1>;

export async function getServerSideProps(): Promise<GetServerSidePropsResult<any>> {
  return Promise.reject(Error('SSR Test 01'));
}

export default Test1;
