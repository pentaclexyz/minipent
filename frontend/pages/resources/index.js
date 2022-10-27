import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/cardContainerLayout";
import Seo from "../../components/seo";
import {ResourceCardMini} from "../../components/resourceCardMini";

export default function Dao({resources}) {
    const seo = {metaTitle: "DAO"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Resources</h1>
            <CardContainerLayout>
                {resources.map((resource, i) => (
                    <ResourceCardMini resource={resource.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const resources = (await fetchAPI("/resources")).data;

    return {
        props: {resources},
        revalidate: 1,
    };
}