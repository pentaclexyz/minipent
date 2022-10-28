import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/mini/articleCardMini";
import Seo from "../../components/seo";

export default function Articles({articles}) {
    const seo = {metaTitle: "Articles"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Articles</h1>
            <CardContainerLayout>
                {articles.map((article, i) => (
                    <ArticleCardMini item={article.attributes} section={"articles"} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const articles = (await fetchAPI("/articles", {
    populate: {
        articles: {populate: "*"},
        people: {populate: "*"},
        coverImage: {populate: "*"},
    },
    })).data;

    return {
        props: {articles},
        revalidate: 1,
    };
}