import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import PlanningCard from "../../components/planningCard";

const PlanningItem = ({planning}) => {
    const seo = {
        metaTitle: planning.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <PlanningCard planning={planning.attributes} id={planning.id}/>
        </Layout>
    );
};

export default PlanningItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("plannings"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const plannings = await fetchAPI("/plannings", {
        filters: {slug: params.slug},
        populate: {
            plannings: {populate: "*"},
            people: {populate: "*"},
            tasks: {populate: "*"},
        },
    });

    return {
        props: {
            planning: plannings.data[0],
        },
        revalidate: 1,
    };
}
