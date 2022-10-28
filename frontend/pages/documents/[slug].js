import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const Document = ({document}) => {
    const seo = {
        metaTitle: document.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={document.attributes} section={"documents"} id={document.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={document.attributes}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default Document;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("documents"),
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
            document: documents.data[0],
        },
        revalidate: 1,
    };
}
