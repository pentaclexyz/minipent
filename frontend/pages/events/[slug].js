import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";


const Event = ({event}) => {
    const seo = {
        metaTitle: event?.attributes?.name,
        metaDescription: `Details for event ${event?.attributes?.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <section>
                <h1>{event?.attributes?.name}</h1>
                <article className={"pb-6 editorial"}>
                    <ReactMarkdown>{event?.attributes?.details}</ReactMarkdown>
                </article>
                <article className={"pb-6 editorial"}>
                    <ReactMarkdown>{event?.attributes?.planning}</ReactMarkdown>
                </article>
            </section>
            <aside>
                <p></p>
            </aside>
        </Layout>
    );
};

export default Event;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("events"),
        fallback: false,
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
