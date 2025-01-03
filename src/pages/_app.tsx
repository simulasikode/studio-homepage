// pages/_app.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Theme from "../styles/theme";
import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <Head>
        {/* Basic Meta Tags */}
        <title>Simulasi Studio</title>
        <meta
          name="description"
          content="Simulation Studio, Workin on screen printing on paper for produce a fine art poster, base on  Yogyakarta, Indonesia"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleTagManager gtmId="GTM-PBBJ4ZFZ" />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
