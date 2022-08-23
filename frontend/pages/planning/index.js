import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {PlanningCardMini} from "../../components/planningCardMini";

export default function Planning({planning}) {
    return (
        <Layout>
            <h1>Planning</h1>
            <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
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