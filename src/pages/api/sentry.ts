// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

// You could type _ before variables that you not going to use that are required
// This way typescript parser will not complain
const handler = (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> | void => {
  if (req.query.error) {
    throw new Error('Sentry API error test')
  }

  res.json({
    success: true,
    message: 'Everything is just fine! ;)',
  })
}

export default withSentry(handler)
