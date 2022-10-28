import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ResourceCard from "../../components/card/resourceCard";

const Document = ({resource}) => {
    const seo = {
        metaTitle: resource.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <ResourceCard item={resource.attributes} id={resource.id}/>
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
            resource: resources.data[0],
        },
        revalidate: 1,
    };
}
