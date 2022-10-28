import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import Seo from "../../components/seo";
import {ArticleCardMini} from "../../components/mini/articleCardMini";

export default function Dao({documents}) {
    const seo = {metaTitle: "DAO"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Resources</h1>
            <CardContainerLayout>
                {documents.map((document, i) => (
                    <ArticleCardMini item={document.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const documents = (await fetchAPI("/documents")).data;

    return {
        props: {documents},
        revalidate: 1,
    };
}