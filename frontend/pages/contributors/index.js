import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ContributorCardMini} from "../../components/contributorCardMini";
import {IntroCard} from "../../components/introCard";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

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
                    <ContributorCardMini item={contributor.attributes} key={i}/>
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
