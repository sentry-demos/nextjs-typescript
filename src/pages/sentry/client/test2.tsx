import { useEffect } from 'react';

const Test2 = (): JSX.Element => {
  useEffect(() => {
    throw new Error('Client Test 02');
  }, []);

  return <h1>Client Test 02</h1>;
};

export default Test2;
