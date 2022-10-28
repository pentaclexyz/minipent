import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const Article = ({article}) => {
    const seo = {
        metaTitle: article.attributes.name,
        metaDescription: `${article.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={article.attributes} section={"articles"} id={article.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={article.attributes}/>
                </article>
            </LayoutPageContent>
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
