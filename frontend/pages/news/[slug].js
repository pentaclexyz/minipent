import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

const Article = ({article}) => {
    const seo = {
        metaTitle: article.attributes.name,
        metaDescription: `${article.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <section className={"grid md:grid-cols-12 gap-6"}>
                <div className={"col-span-8"}>
                    <h1>{article.attributes.name}</h1>
                    <div className={"whitespace-pre-wrap"}>
                        <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Article;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("articles"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const articles = await fetchAPI("/articles", {
        filters: {slug: params.slug},
        populate: {
            articles: {populate: "*"},
            people: {populate: "*"},
        },
    });

    return {
        props: {
            article: articles.data[0],
        },
        revalidate: 1,
    };
}


