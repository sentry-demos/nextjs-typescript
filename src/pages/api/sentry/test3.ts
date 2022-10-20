import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

function work() {
  throw new Error('API Test 03');
}

async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  work();

  res.status(200).json({ name: 'John Doe' });
}

export default withSentry(handler);
