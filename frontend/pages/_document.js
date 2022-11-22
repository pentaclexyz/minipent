import {Html, Head, Main, NextScript} from "next/document";
import React from "react";
import {fetchAPI} from "../lib/api";

export default function Document({global}) {
    return (
        <Html data-theme={"root"}>
            <Head>
            </Head>
            <body className={"bg-p-bg text-txt-primary"}>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}

export async function getStaticProps() {
    const global = (await fetchAPI("/global", {
        populate: {
            global: {populate: "styles"},
        },
    })).data;

    return {
        props: {global},
        revalidate: 1,
    };
}


