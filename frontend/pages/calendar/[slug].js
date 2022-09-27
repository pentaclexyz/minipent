import React from "react";
import {fetchAPI, getSlugsForPath} from "../../lib/api";
import {PersonCardMini} from "../../components/personCardMini";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import CalendarCard from "../../components/calendarCard";
import LayoutPageContent from "../../components/layoutPageContent";

const Calendar = ({calendar}) => {
    const seo = {
        metaTitle: calendar.attributes.name,
        metaDescription: `${calendar.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>

            <LayoutPageContent>
                <calendar className={"md:col-span-8"}>
                <CalendarCard item={calendar.attributes} id={calendar.id}/>
                </calendar>
                <calendar className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    {calendar.attributes.people.data.map((person, i) => (
                        <PersonCardMini person={person.attributes} key={i}/>
                    ))}
                </calendar>

            </LayoutPageContent>
        </Layout>
    );
};

export default Calendar;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("calendar-items"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const calendarItems = await fetchAPI("/calendar-items", {
        filters: {slug: params.slug},
        populate: {
            calendarItems: {populate: "*"},
            people: {populate: "*"},
        },
    });

    return {
        props: {
            calendar: calendarItems.data[0],
        },
        revalidate: 1,
    };
}
