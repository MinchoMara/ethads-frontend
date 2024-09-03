import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { Fragment } from "react";

export default class MyDocument extends Document {
  static override async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [<Fragment key="styles">{initialProps.styles}</Fragment>],
    };
  }

  override render() {
    return (
      <Html lang="en">
        <Head>
          {/* common */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Language" content="en" />
          <meta name="language" content="en" />
          <meta property="og:locale" content="en" />
          <meta charSet="UTF-8" key="charset" />
          {/* fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* favicon */}
          <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}