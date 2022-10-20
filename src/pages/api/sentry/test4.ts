import * as Sentry from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    throw new Error('API Test 04');
    res.status(200).json({ name: 'John Doe' }); // NOSONAR
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
    res.status(500).json({});
  }
}

export default Sentry.withSentry(handler);
