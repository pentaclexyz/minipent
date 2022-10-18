import React from "react";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import {EventCardMini} from "../../components/eventCardMini";
import Seo from "../../components/seo";

export default function Events({ events }) {
  const seo = {metaTitle: "Events"};
  return (
    <Layout>
      <Seo seo={seo}/>
      <h1>Events</h1>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
            {events.map((item, i) => (
                <EventCardMini item={item.attributes} key={i} />
            ))}
        </div>
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
