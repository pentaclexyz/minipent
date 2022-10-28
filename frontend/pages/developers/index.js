import React from "react";
import Layout from "../../components/layouts/layout";
import { fetchAPI } from "../../lib/api";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/mini/articleCardMini";

export default function Developers({ developers }) {
  const seo = {metaTitle: "Developers"};
  return (
    <Layout>
      <Seo seo={seo}/>
      <h1>Developers</h1>
        <CardContainerLayout>
            {developers.map((developer, i) => (
                <ArticleCardMini item={developer.attributes} section={"developers"} key={i} />
            ))}
        </CardContainerLayout>
    </Layout>
  );
}
export async function getStaticProps() {
  const developers = (await fetchAPI("/developers")).data;

  return {
    props: {
        developers,
    },
    revalidate: 1,
  };
}
