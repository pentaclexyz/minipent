import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import Seo from "../../components/seo";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";

export default function Dao({resources}) {
    const seo = {metaTitle: "Resources"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Resources</h1>
            <CardContainerLayout>
                {resources.map((resource, i) => (
                    <ArticleCardMini item={resource.attributes} section={"resources"} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const resources = (await fetchAPI("/resources")).data;

    return {
        props: {resources},
        revalidate: 1,
    };
}