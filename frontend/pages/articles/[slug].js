import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import {PersonCardMini} from "../../components/personCardMini";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ArticleCard from "../../components/articleCard";
import LayoutPageContent from "../../components/layoutPageContent";

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
                <ArticleCard item={article.attributes} id={article.id}/>
                </article>
                {/*<article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">*/}
                {/*    {article.attributes.people.data.map((person, i) => (*/}
                {/*        <PersonCardMini person={person.attributes} key={i}/>*/}
                {/*    ))}*/}
                {/*</article>*/}

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
            // people: {populate: "*"},
        },
    });

    return {
        props: {
            article: articles.data[0],
        },
        revalidate: 1,
    };
}
