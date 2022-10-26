import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/cardContainerLayout";
import Seo from "../../components/seo";
import {DocumentCardMini} from "../../components/documentCardMini";

export default function Documents({documents}) {
    const seo = {metaTitle: "Docs"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Docs</h1>
            <CardContainerLayout>
                {documents.map((document, i) => (
                    <DocumentCardMini document={document.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const documents = (await fetchAPI("/documents", {
    populate: {
        documents: {populate: "*"},
        coverImage: {populate: "*"},
    },
    })).data;

    return {
        props: {documents},
        revalidate: 1,
    };
}