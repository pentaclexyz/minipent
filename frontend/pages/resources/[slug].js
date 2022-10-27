import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ArticleCard from "../../components/articleCard";
import LayoutPageContent from "../../components/layoutPageContent";

const Document = ({resource}) => {
    const seo = {
        metaTitle: resource.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <ArticleCard item={resource.attributes} id={resource.id}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default Document;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("resources"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const resources = await fetchAPI("/resources", {
        filters: {slug: params.slug},
        populate: {
            resources: {populate: "*"},
        },
    });

    return {
        props: {
            resources: resources.data[0],
        },
        revalidate: 1,
    };
}