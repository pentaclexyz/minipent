import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import ArticleContent from "../../components/cards/articleContent";
import {ArticleAside} from "../../components/layouts/articleAside";
import React from "react";


const Event = ({event}) => {
    const seo = {
        metaTitle: event?.attributes?.name,
        metaDescription: `Details for event ${event?.attributes?.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <section className={"md:col-span-8"}>
                    <h1>{event?.attributes?.name}</h1>
                    <article className={"pb-6 editorial"}>
                        <ReactMarkdown>{event?.attributes?.details}</ReactMarkdown>
                    </article>
                    <article className={"pb-6 editorial"}>
                        <ReactMarkdown>{event?.attributes?.planning}</ReactMarkdown>
                    </article>
                </section>
                <article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">
                    <ArticleAside item={event.attributes}/>
                </article>
            </LayoutPageContent>
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
