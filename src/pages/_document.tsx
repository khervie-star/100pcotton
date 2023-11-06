import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />

        {/* <!-- Primary Meta Tags --> */}
        {/* <title>100% Cotton</title> */}
        {/* <meta name="title" content="100pCotton | A CHICAGO BRAND" />
        <meta
          name="description"
          content="Wear your creativity, own your story."
        /> */}

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.100pcotton.com" />
        <meta property="og:title" content="100pCotton | A CHICAGO BRAND" />
        <meta
          property="og:description"
          content="Wear your creativity, own your story."
        />
        {/* <meta
          property="og:image"
          content="https://res.cloudinary.com/z-pro-trading/image/upload/v1686491789/assets/og-image_kvwqzq.png"
        /> */}
        <meta
          property="og:image:secure_url"
          content="https://res.cloudinary.com/z-pro-trading/image/upload/v1686491789/assets/og-image_kvwqzq.png"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.100pcotton.com" />
        <meta property="twitter:title" content="100pCotton | A CHICAGO BRAND" />
        <meta
          property="twitter:description"
          content="Wear your creativity, own your story."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/z-pro-trading/image/upload/v1686491789/assets/og-image_kvwqzq.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
