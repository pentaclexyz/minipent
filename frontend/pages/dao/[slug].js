import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";

const Document = ({dao}) => {
    const seo = {
        metaTitle: dao.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                    <ArticleContent item={dao.attributes} section={"daos"} id={dao.id}/>
                </article>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={dao.attributes}/>
                </article>
            </LayoutPageContent>
        </Layout>
    );
};

export default Document;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("daos"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const daos = await fetchAPI("/daos", {
        filters: {slug: params.slug},
        populate: {
            daos: {populate: "*"},
        },
    });

    return {
        props: {
            dao: daos.data[0],
        },
        revalidate: 1,
    };
}
