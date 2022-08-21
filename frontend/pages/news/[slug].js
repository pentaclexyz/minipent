import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import React from "react";

const NewsItem = ({item}) => {
    const seo = {
        metaTitle: item.attributes.name,
        metaDescription: `${item.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <section className={"grid md:grid-cols-12 gap-6"}>
                <div className={"col-span-8"}>
                    <h1>{item.attributes.name}</h1>
                    <div className={"whitespace-pre-wrap"}>
                        <ReactMarkdown>{item.attributes.content}</ReactMarkdown>
                    </div>
                </div>
            </section>
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
            item: news.data[0],
        },
        revalidate: 1,
    };
}


