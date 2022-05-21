import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";


class MyDocument extends Document {
  
  render() {
    return (
      <Html lang="pt_Br">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="Carteira to-do" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@100;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument