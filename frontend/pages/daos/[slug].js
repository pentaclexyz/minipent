import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ArticleCard from "../../components/articleCard";
import LayoutPageContent from "../../components/layoutPageContent";

const Document = ({dao}) => {
    const seo = {
        metaTitle: document.attributes.name,
        metaDescription: `${document.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <ArticleCard item={dao.attributes} id={dao.id}/>
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
    const daos = await fetchAPI("/articles", {
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
