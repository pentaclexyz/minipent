import React from "react";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import {ContributorCardMini} from "../../components/contributorCardMini";

export default function Contributors({ contributors }) {
  return (
    <Layout>
      <h1>Contributors</h1>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
            {contributors.map((contributor, i) => (
                <ContributorCardMini item={contributor.attributes} key={i} />
            ))}
        </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const contributors = (await fetchAPI("/contributors")).data;

  return {
    props: {
        contributors,
    },
    revalidate: 1,
  };
}
