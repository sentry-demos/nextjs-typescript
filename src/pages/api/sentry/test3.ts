import { NextApiRequest, NextApiResponse } from 'next';

function work() {
  throw new Error('API Test 03');
}

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  work();

  res.status(200).json({ name: 'John Doe' });
};

export default handler;
