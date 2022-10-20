import { useEffect } from 'react';

const Test1 = (): JSX.Element => {
  useEffect(() => {
    async function doTest() {
      const doAsyncWork = () => Promise.reject(new Error('Client Test 01'));
      await doAsyncWork();
    }
    doTest();
  }, []);

  return <h1>Client Test 01</h1>;
};

export default Test1;
