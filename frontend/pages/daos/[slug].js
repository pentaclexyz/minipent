import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import DaoCard from "../../components/card/daoCard";

const Document = ({dao}) => {
    const seo = {
        metaTitle: dao.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <DaoCard item={dao.attributes} id={dao.id}/>
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
