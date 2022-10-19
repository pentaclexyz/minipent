import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {PlanningCardMini} from "../../components/planningCardMini";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

export default function Planning({planning}) {
    const seo = {metaTitle: "Planning"};
    return (
        <Layout>
            <h1>Planning</h1>
            <Seo seo={seo}/>
            <CardContainerLayout>
                {planning.map((item, i) => (
                    <PlanningCardMini item={item.attributes} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const planning = (await fetchAPI("/plannings")).data;
    return {
        props: {planning},
        revalidate: 1,
    };
}