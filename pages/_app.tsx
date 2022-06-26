import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { wrapper } from "../redux/store";
import Head from "next/head";
const colors = {
  brand: {
    100: "#ED64A6",
    200: "#ED64A6",
    300: "#ED64A6",
    400: "#ED64A6",
    500: "#ED64A6",
    600: "#ED64A6",
    700: "#ED64A6",
    800: "#ED64A6",
    900: "#ED64A6",
  },
};
const theme = extendTheme({ colors });
function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <>
      <Head>
        <title>E-BOOK App</title>
        <meta name="description" content="a simple movie app " />
        <link rel="icon" href="/letter.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextNProgress color="#ED64A6" showOnShallow={true} />
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

//export default MyApp;
export default wrapper.withRedux(MyApp);
