import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

const doAsyncWork = () => Promise.reject(new Error('API Test 01'));
doAsyncWork();

async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  res.status(200).json({ name: 'John Doe' });
}

export default withSentry(handler);
