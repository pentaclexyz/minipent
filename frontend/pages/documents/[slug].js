import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import DocumentCard from "../../components/card/documentCard";

const Document = ({document}) => {
    const seo = {
        metaTitle: document.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <article className={"md:col-span-8"}>
                <DocumentCard item={document.attributes} id={document.id}/>
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
