import {Html, Head, Main, NextScript} from "next/document";
import React from "react";
import {fetchAPI} from "../lib/api";

export default function Document() {
    return (
        <Html data-theme={"root"}>
            <Head>
                {/*<link rel={"stylesheet"} href={"https://minipent.xyz/styles/opyn.css"}/>*/}
                <link rel={"stylesheet"} href={global.styles}/>
            </Head>
            <body className={"bg-p-bg text-txt-primary"}>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}

export async function getStaticProps() {
    const global = (await fetchAPI("/global"));
    return {
        props: {global: global.data},
        revalidate: 1,
    };
}


