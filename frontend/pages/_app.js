import "@rainbow-me/rainbowkit/styles.css";
import App from "next/app";
import Head from "next/head";
import {QueryClientProvider, QueryClient} from "react-query";
import { createContext } from "react";

import "../styles/globals.css";
// import Styles from "`${process.env.REACT_APP_THEME}`";
import GlobalContext from "../contexts/GlobalContext";
import {fetchAPI} from "../lib/api";
import {getStrapiMedia} from "../lib/media";


const queryClient = new QueryClient();

const Providers = ({children}) => {
    return (<>
            {children}
        </>
    );
};
const MyApp = ({Component, pageProps}) => {
    const {global} = pageProps;

    return (
        <Providers>
            <Head>
                <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon)}/>
            </Head>
            <GlobalContext.Provider value={global.attributes}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </GlobalContext.Provider>
        </Providers>
    );
};

MyApp.getInitialProps = async (ctx) => {
    const appProps = await App.getInitialProps(ctx);
    const globalRes = await fetchAPI("/global", {
        populate: {
            defaultSeo: {populate: "*",},
            defaultNav: {populate: "*",},
            brand: {populate: "*",},
            logo: {populate: "*",},
        },
    });
    // Pass the data to our page via props
    return {...appProps, pageProps: {global: globalRes.data}};
};

export default MyApp;
