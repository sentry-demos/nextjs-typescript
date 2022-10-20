import { captureException, flush, captureUnderscoreErrorException } from '@sentry/nextjs';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';
import { NextPageContext } from 'next';

export type ErrorPageProps = {
  err: Error;
  statusCode: number;
  isReadyToRender: boolean;
  children?: React.ReactElement;
};

export type ErrorProps = {
  isReadyToRender: boolean;
} & NextErrorProps;

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { statusCode, isReadyToRender, err, children = null } = props;
  // eslint-disable-next-line no-debugger

  if (!['development'].includes(process.env.NEXT_PUBLIC_APP_STAGE)) {
    console.warn(
      'ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:'
    );
    console.error(err);
  }

  if (!isReadyToRender && err) {
    captureException(err);
  }

  return <>{children ?? <NextErrorComponent statusCode={statusCode} />}</>;
};

ErrorPage.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err, asPath } = props;

  const errorInitialProps: ErrorProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  if (!['production'].includes(process.env.NEXT_PUBLIC_APP_STAGE)) {
    console.error(
      'ErrorPage.getInitialProps - Unexpected error caught, it was captured and sent to Sentry. Error details:',
      err
    );
  }

  errorInitialProps.isReadyToRender = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404, isReadyToRender: true };
  }

  if (err) {
    await captureUnderscoreErrorException(props);
    return errorInitialProps;
  }

  captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  await flush(2000);

  return errorInitialProps;
};

export default ErrorPage;
