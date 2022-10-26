import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import CardContainerLayout from "../../components/cardContainerLayout";
import Seo from "../../components/seo";
import {DaoCardMini} from "../../components/daoCardMini";

export default function Dao({daos}) {
    const seo = {metaTitle: "DAO"};
    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>DAO</h1>
            <CardContainerLayout>
                {daos.map((dao, i) => (
                    <DaoCardMini dao={dao.attributes} key={i} />
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