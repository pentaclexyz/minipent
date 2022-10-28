import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import {IntroCard} from "../../components/cards/introCard";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/mini/articleCardMini";

export default function Contributors({intros, contributors}) {
    const seo = {metaTitle: "Contributors"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Contributors</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
            <CardContainerLayout>
                {contributors.data.map((contributor, i) => (
                    <ArticleCardMini item={contributor.attributes} section={"contributors"} key={i}/>
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {

    const contributorpage = await fetchAPI("/contributorpage", {
        populate: {
            intros: {populate: "*"},
            contributors: {populate: "*"},
        },
    });

    return {
        props: {
            intros: contributorpage.data.attributes.intros,
            contributors: contributorpage.data.attributes.contributors,
        },
        revalidate: 1,
    };
}
