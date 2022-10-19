import React from "react";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import {DeveloperCardMini} from "../../components/developerCardMini";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

export default function Developers({ developers }) {
  const seo = {metaTitle: "Developers"};
  return (
    <Layout>
      <Seo seo={seo}/>
      <h1>Developers</h1>
        <CardContainerLayout>
            {developers.map((developer, i) => (
                <DeveloperCardMini item={developer.attributes} key={i} />
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
