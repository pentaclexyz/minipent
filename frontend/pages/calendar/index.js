import React from "react";
import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {CalendarCardMini} from "../../components/calendarCardMini";

export default function Articles({calendarItems}) {
    return (
        <Layout>
            <h1>Calendar items</h1>
            <div className="grid gap-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                {calendarItems.map((calendarItem, i) => (
                    <CalendarCardMini item={calendarItem.attributes} key={i} />
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const calendarItems = (await fetchAPI("/calendar-items")).data;
    return {
        props: {calendarItems,},
        revalidate: 1,
    };
}