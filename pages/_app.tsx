import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { wrapper } from "../redux/store";
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
