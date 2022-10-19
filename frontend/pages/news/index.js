import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {NewsCardMini} from "../../components/newsCardMini";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

export default function News({ news }) {
    const seo = {metaTitle: "News"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>News</h1>
            <CardContainerLayout>
                {news.map((item, i) => (
                    <NewsCardMini item={item.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const news = (await fetchAPI("/news")).data;
    return {
        props: {
            news,
        },
        revalidate: 1,
    };
}