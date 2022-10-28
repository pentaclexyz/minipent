import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import React from "react";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const NewsItem = ({news}) => {
    const seo = {
        metaTitle: news.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={news.attributes} section={"news"} id={news.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={news.attributes}/>
                </article>
            </LayoutPageContent>
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


