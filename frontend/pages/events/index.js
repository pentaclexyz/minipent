import React from "react";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import {EventCardMini} from "../../components/eventCardMini";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

export default function Events({ events }) {
  const seo = {metaTitle: "Events"};
  return (
    <Layout>
      <Seo seo={seo}/>
      <h1>Events</h1>
        <CardContainerLayout>
            {events.map((item, i) => (
                <EventCardMini item={item.attributes} key={i} />
            ))}
        </CardContainerLayout>
    </Layout>
  );
}
export async function getStaticProps() {
  const events = (await fetchAPI("/events")).data;

  return {
    props: {
        events,
    },
    revalidate: 1,
  };
}
