import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import {IntroCard} from "../../components/cards/introCard";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";

export default function Contributors({intros, contributors, developers}) {
    const seo = {metaTitle: "Contributors"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Contributors</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
            <CardContainerLayout>
                {developers.data.map((developer, i) => (
                    <ArticleCardMini item={developer.attributes} section={"developers"} key={i}/>
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {

    const contributorpage = await fetchAPI("/contributorpage", {
        populate: {
            intros: {populate: "*"},
            developers: {populate: "*"},
        },
    });

    return {
        props: {
            intros: contributorpage.data.attributes.intros,
            developers: contributorpage.data.attributes.developers,
        },
        revalidate: 1,
    };
}
