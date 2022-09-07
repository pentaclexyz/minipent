import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import EventCard from "../../components/eventCard";


const Event = ({event}) => {
    const seo = {
        metaTitle: event.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <EventCard event={event.attributes} id={event.id}/>
        </Layout>
    );
};

export default Event;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("events"),
        fallback: true,
    };
}

export async function getStaticProps({params}) {
    const events = await fetchAPI("/events", {
        filters: {slug: params.slug},
        populate: {
            events: {populate: "*"},
            people: {populate: "*"},
        },
    });

    return {
        props: {
            event: events.data[0],
        },
        revalidate: 1,
    };
}
