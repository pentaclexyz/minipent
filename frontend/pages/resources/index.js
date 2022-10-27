import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/cardContainerLayout";
import Seo from "../../components/seo";
import {ResourceCardMini} from "../../components/resourceCardMini";

export default function Resources({resources}) {
    const seo = {metaTitle: "Docs"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Resources</h1>
            <CardContainerLayout>
                {resources.map((resource, i) => (
                    <ResourceCardMini document={resource.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const resources = (await fetchAPI("/resources", {
    populate: {
        resources: {populate: "*"},
        coverImage: {populate: "*"},
    },
    })).data;

    return {
        props: {resources},
        revalidate: 1,
    };
}