import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import React from "react";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const ContributorItem = ({item}) => {
    const seo = {
        metaTitle: item.attributes.name,
        metaDescription: `${item.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={item.attributes} section={"contributors"} id={item.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={item.attributes}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default ContributorItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("contributors"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const contributors = await fetchAPI("/contributors", {
        filters: {slug: params.slug},
        populate: {
            contributors: {populate: "*"},
        },
    });

    return {
        props: {
            item: contributors.data[0],
        },
        revalidate: 1,
    };
}


