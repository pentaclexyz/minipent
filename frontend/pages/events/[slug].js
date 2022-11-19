import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import LayoutPageContent from "../../components/layouts/layoutPageContent";
import {ArticleAside} from "../../components/layouts/articleAside";
import React from "react";
import {getStrapiMedia} from "../../lib/media";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";


const Event = ({event}) => {
    const seo = {
        metaTitle: event?.attributes?.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <LayoutPageContent>
                <section className={"md:col-span-8"}>
                    <h1>{event.attributes.name}</h1>
                    {/*{event?.attributes?.projects.data.map((item, i) => (*/}
                    {/*    <p key={i}>{item.attributes.name}</p>*/}
                    {/*))}*/}
                    <CardContainerLayout>
                    {event.attributes.projects.data.map((project, i) => (
                        <ArticleCardMini item={project.attributes} section={"projects"} key={i}/>
                    ))}
                    </CardContainerLayout>
                    <article className={"pb-6 editorial"}>
                        <ReactMarkdown>{event?.attributes?.details}</ReactMarkdown>
                    </article>


                    <article className={"pb-6 editorial"}>
                        <ReactMarkdown>{event?.attributes?.planning}</ReactMarkdown>
                    </article>
                </section>
                {/*<article className="pt-6 md:pt-0 md:col-span-4 sm:mt-4">*/}
                {/*    <ArticleAside item={event.attributes}/>*/}
                {/*</article>*/}
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
            projects: {populate: "*"},
            coverImage: {populate: "*"},
        },
    });

    return {
        props: {
            event: events.data[0],
        },
        revalidate: 1,
    };
}
