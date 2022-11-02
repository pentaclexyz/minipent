import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";

export default function News({ news }) {
    const seo = {metaTitle: "News"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>News</h1>
            <CardContainerLayout>
                {news.map((item, i) => (
                    <ArticleCardMini item={item.attributes} section={"news"} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const news = (await fetchAPI("/news", {
        populate: {
            news: {populate: "*"},
            coverImage: {populate: "*"},
        },
    })).data;

    return {
        props: {news},
        revalidate: 1,
    };
}