import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import React from "react";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const AboutItem = ({item}) => {
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

export default AboutItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("about"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const about = await fetchAPI("/about", {
        filters: {slug: params.slug},
        populate: {
            about: {populate: "*"},
        },
    });

    return {
        props: {
            item: contributors.data[0],
        },
        revalidate: 1,
    };
}


