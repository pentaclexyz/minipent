import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import React from "react";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const DeveloperItem = ({item}) => {
    const seo = {
        metaTitle: item.attributes.name,
        metaDescription: `${item.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={item.attributes} section={"developers"} id={item.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={item.attributes}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default DeveloperItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("developers"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const developers = await fetchAPI("/developers", {
        filters: {slug: params.slug},
        populate: {
            contributors: {populate: "*"},
        },
    });

    return {
        props: {
            item: developers.data[0],
        },
        revalidate: 1,
    };
}


