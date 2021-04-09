import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import { Integrations } from '@sentry/tracing'
import { NextApiRequest, NextApiResponse } from 'next'
export const init = (): void => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // console.debug(process.env.NEXT_PUBLIC_APP_STAGE);
    const integrations = []
    if (
      process.env.NEXT_IS_SERVER === 'true' &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            console.warn(
              `ROOT :${process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR}`
            )
            console.warn(`FILENAME :${frame.filename}`)
            // eslint-disable-next-line no-param-reassign
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///'
            )
            // eslint-disable-next-line no-param-reassign
            frame.filename = frame.filename.replace('.next', '_next')
            console.warn(`FILENAME NEW :${frame.filename}`)
            return frame
          },
        })
      )
    }
    integrations.push(new Integrations.BrowserTracing())
    Sentry.init({
      enabled: process.env.NEXT_PUBLIC_APP_STAGE !== 'development',
      environment: process.env.NEXT_PUBLIC_APP_STAGE,
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: `${process.env.NEXT_PUBLIC_COMMIT_SHA}`,
      tracesSampleRate: 1.0,
    })
    Sentry.configureScope((scope) => {
      scope.setTag('stage', process.env.NEXT_PUBLIC_APP_STAGE)
    })
  }
}
/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 */
export const configureReq = (_req: NextApiRequest): void => {
  Sentry.configureScope((_scope) => {
    // scope.setTag('host', get(req, 'headers.host'));
    // scope.setTag('url', get(req, 'url'));
    // scope.setTag('method', get(req, 'method'));
    // scope.setContext('query', get(req, 'query'));
    // scope.setContext('cookies', get(req, 'cookies'));
    // scope.setContext('headers', get(req, 'headers'));
  })
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withSentry = (handler) => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    init()
    handler(req, res)
  } catch (e) {
    console.warn('Configure sentry tag/context')
    configureReq(req)
    console.warn('Send data to sentry', e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    res.json({
      error: true,
      environment: process.env.NODE_ENV,
      stage: process.env.NEXT_PUBLIC_APP_STAGE,
      message:
        process.env.NEXT_PUBLIC_APP_STAGE !== 'production'
          ? e.message
          : undefined,
    })
  }
}
export default Sentry
