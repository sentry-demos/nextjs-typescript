import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
// import { css } from '@design/stitches.config';

// type propsType = {
//   styles: JSX.Element
//   html: string
//   head?: JSX.Element[]
// }

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    // const originalRenderPage = ctx.renderPage;

    // let extractedStyles
    //   ctx.renderPage = () => {
    //     // const { styles, result } = css.getStyles(originalRenderPage);
    //     // extractedStyles = styles;
    //     return result;
    //   };

    const initialProps = await NextDocument.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
