import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ContributorCardMini} from "../../components/contributorCardMini";
import {IntroCard} from "../../components/introCard";

export default function Contributors({intros, contributors}) {
    return (
        <Layout>
            <h1>Contributors</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
            <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                {contributors.map((contributor, i) => (
                    <ContributorCardMini item={contributor.attributes} key={i}/>
                ))}
            </div>
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
