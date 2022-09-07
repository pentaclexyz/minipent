import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import React from "react";
import BackLink from "../../components/backLink";
import NewsCard from "../../components/newsCard";

const NewsItem = ({news}) => {
    const seo = {
        metaTitle: news.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <NewsCard news={news.attributes} id={news.id}/>
        </Layout>
    );
};

export default NewsItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("news"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const news = await fetchAPI("/news", {
        filters: {slug: params.slug},
        populate: {
            news: {populate: "*"},
        },
    });

    return {
        props: {
            news: news.data[0],
        },
        revalidate: 1,
    };
}


