import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { Provider } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Web3Provider } from "../hooks/web3js/web3context";
import { store } from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "react-hot-toast";

import createEmotionCache from "../utility/createEmotionCache";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "../styles/theme";

import "../styles/nprogress.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

import NProgress from "nprogress";
import "../styles/swiperJs.scss";
import Head from "next/head";
import { Loader } from "../Components/Loader";
import WalletProvider from "../Provider/WalletContext";

const clientSideEmotionCache = createEmotionCache();

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  const handleTransitionEnd = () => {
    const root = document.getElementById("__next");
    const loader = document.getElementById("loader");
    root?.removeChild(loader!);
  };

  useLayoutEffect(() => {
    setTimeout(() => setIsLoading(false), 1400);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Web3Provider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <WalletProvider>
                <div>
                  {/* <Head>
                    <title>100pCotton</title>
                    <meta
                      name="description"
                      content="Wear your creativity, own your story."
                    />
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1"
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                      property="og:url"
                      content="https://www.100pcotton.com"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="100Percent Cotton" />
                    <meta property="twitter:card" content="summary" />
                    <meta
                      property="og:description"
                      content="Wear your creativity, own your story."
                    />
                    <meta
                      property="og:image"
                      content={
                        "https://res.cloudinary.com/z-pro-trading/image/upload/v1686491789/assets/og-image_kvwqzq.png"
                      }
                    />
                  </Head> */}
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                      className: "",
                      duration: 3000,
                      style: {
                        fontFamily: "Sora",
                        fontWeight: "bold",
                        background: "#15143a",
                        color: "#ffffff",
                        border: "none",
                      },
                    }}
                  />
                </div>
                <Loader
                  onTransitionEnd={handleTransitionEnd}
                  isLoading={isLoading}
                />
                <Component {...pageProps} />
                <Analytics />
              </WalletProvider>
            </LocalizationProvider>
          </Web3Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
