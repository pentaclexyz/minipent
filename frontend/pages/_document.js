import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
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
