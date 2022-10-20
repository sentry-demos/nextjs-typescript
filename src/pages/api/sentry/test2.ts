import { NextApiRequest, NextApiResponse } from 'next';

function work() {
  throw new Error('API Test 02');
}

work();

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
