import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";

export default function Planning({planning}) {
    const seo = {metaTitle: "Planning"};
    return (
        <Layout>
            <h1>Planning</h1>
            <Seo seo={seo}/>
            <CardContainerLayout>
                {planning.map((item, i) => (
                    <ArticleCardMini item={item.attributes} section={"planning"} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const planning = (await fetchAPI("/plannings")).data;
    return {
        props: {planning},
        revalidate: 1,
    };
}