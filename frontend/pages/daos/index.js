import React from "react";
import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import Seo from "../../components/seo";
import {ArticleCardMini} from "../../components/mini/articleCardMini";

export default function Dao({daos}) {
    const seo = {metaTitle: "DAO"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>DAO</h1>
            <CardContainerLayout>
                {daos.map((dao, i) => (
                    <ArticleCardMini item={dao.attributes} section={"daos"} key={i} />
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {
    const daos = (await fetchAPI("/daos")).data;

    return {
        props: {daos},
        revalidate: 1,
    };
}