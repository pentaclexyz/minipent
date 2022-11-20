import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html data-theme={"canto"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <body className={"bg-p-bg text-txt-primary"}>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
