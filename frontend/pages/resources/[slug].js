import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ArticleCard from "../../components/articleCard";
import LayoutPageContent from "../../components/layoutPageContent";

const Document = ({document}) => {
    const seo = {
        metaTitle: document.attributes.name,
        metaDescription: `${document.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <ArticleCard item={document.attributes} id={document.id}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default Document;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("articles"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const documents = await fetchAPI("/documents", {
        filters: {slug: params.slug},
        populate: {
            documents: {populate: "*"},
        },
    });

    return {
        props: {
            documents: documents.data[0],
        },
        revalidate: 1,
    };
}
