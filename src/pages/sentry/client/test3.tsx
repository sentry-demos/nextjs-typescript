const Test3 = (): JSX.Element => (
  <>
    <h1>Client Test 03</h1>
    <button
      type="button"
      onClick={() => {
        throw new Error('Client Test 03');
      }}
    >
      Click me to throw an Error
    </button>
  </>
);

export default Test3;
