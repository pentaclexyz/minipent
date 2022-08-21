import "@rainbow-me/rainbowkit/styles.css";
import App from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import {darkTheme, getDefaultWallets, lightTheme, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "../styles/globals.css";
import GlobalContext from "../contexts/GlobalContext";
import { fetchAPI } from "../lib/api";
import { CoingeckoProvider } from "../contexts/CoingeckoContext";
import { getStrapiMedia } from "../lib/media";
import { FavoriteContextProvider } from "../contexts/FavoriteContext";

const queryClient = new QueryClient();

const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "pentacle",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Providers = ({ children }) => {
  return (
    <WagmiConfig
      client={wagmiClient}
    >
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'large',
          fontStack: 'system',
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <Providers>
      <Head>
        {/*<link*/}
        {/*  rel="shortcut icon"*/}
        {/*  href={getStrapiMedia(global?.attributes?.favicon)}*/}
        {/*/>*/}
      </Head>
      <CoingeckoProvider>
        <GlobalContext.Provider value={global?.attributes}>
          <FavoriteContextProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </FavoriteContextProvider>
        </GlobalContext.Provider>
      </CoingeckoProvider>
    </Providers>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const globalRes = await fetchAPI("/global", {
    populate: {
      // favicon: "*",
      defaultSeo: {
        populate: "*",
      },
      defaultNav: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
