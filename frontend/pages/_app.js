import React from "react";
import GlobalContext from "../contexts/GlobalContext";
import App from "next/app";
import Head from "next/head";
import {QueryClientProvider, QueryClient} from "react-query";
import {fetchAPI} from "../lib/api";
import {getStrapiMedia} from "../lib/media";
import "../styles/globals.css";

const queryClient = new QueryClient();

const Providers = ({children}) => {
    return (<>{children}</>);
};
const MyApp = ({Component, pageProps}) => {
    const {global} = pageProps;

    return (
        <Providers>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="shortcut icon" type="image/x-icon" href={getStrapiMedia(global.attributes.favicon)}/>
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
            footerNav: {populate: "*",},
            icon: "*",
            favicon: "*",
            logo: "*",
            siteName: "*",
            styles: "*"},
    });
    // Pass the data to our page via props
    return {...appProps, pageProps: {global: globalRes.data}};
};

export default MyApp;
