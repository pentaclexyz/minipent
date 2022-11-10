import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import {IntroCard} from "../../components/cards/introCard";
import Seo from "../../components/seo";

export default function About({intros}) {
    const seo = {metaTitle: "About"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>About</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
        </Layout>
    );
}

export async function getStaticProps() {

    const aboutPage = await fetchAPI("/about", {
        populate: {
            intros: {populate: "*"},
        },
    });

    return {
        props: {
            intros: aboutPage.data.attributes.intros,
        },
        revalidate: 1,
    };
}
