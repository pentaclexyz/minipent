import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {PlanningCardMini} from "../../components/planningCardMini";
import Seo from "../../components/seo";

export default function Planning({planning}) {
    const seo = {metaTitle: "Planning"};
    return (
        <Layout>
            <h1>Planning</h1>
            <Seo seo={seo}/>
            <div className="grid md:gap-y-12 md:gap-x-8 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                {planning.map((item, i) => (
                    <PlanningCardMini item={item.attributes} key={i} />
                ))}
            </div>
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