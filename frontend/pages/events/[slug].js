import {fetchAPI} from "../../lib/api";
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
                <article className={"pb-6"}>
                    <ReactMarkdown>{event?.attributes?.details}</ReactMarkdown>
                </article>
                <article className={"pb-6"}>
                    <ReactMarkdown>children={event?.attributes?.planning}</ReactMarkdown>
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
        // paths: await getSlugsForPath("events"),
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps({params}) {
    try {
        const matchingEvents = await fetchAPI("/events", {
            filters: {slug: params.slug},
        });
        return {
            props: {
                event: matchingEvents.data[0],
            },
            revalidate: 1,
        };
    } catch (e) {
        return {
            props: {
                event: {},
            },
            revalidate: 1,
        };
    }
}
