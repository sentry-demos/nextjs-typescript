import { NextApiRequest, NextApiResponse } from 'next';

const doAsyncWork = () => Promise.reject(new Error('API Test 01'));
doAsyncWork();

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
