import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ArticleCardMini} from "../../components/articleCardMini";
import Seo from "../../components/seo";

export default function Articles({articles}) {
    const seo = {metaTitle: "Articles"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Articles</h1>
            <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                {articles.map((article, i) => (
                    <ArticleCardMini item={article.attributes} key={i} />
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const articles = (await fetchAPI("/articles")).data;
    return {
        props: {
            articles,
        },
        revalidate: 1,
    };
}