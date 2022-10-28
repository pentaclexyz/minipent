import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";
import React from "react";

const DeveloperItem = ({item}) => {
    const seo = {
        metaTitle: item.attributes.name,
        metaDescription: `${item.attributes.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <section className={"grid md:grid-cols-12 gap-6"}>
                <div className={"col-span-8"}>
                    <h1>{item.attributes.name}</h1>
                    <div className={"whitespace-pre-wrap"}>
                        <ReactMarkdown>{item.attributes.description}</ReactMarkdown>
                        <ReactMarkdown>{item.attributes.content}</ReactMarkdown>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DeveloperItem;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("developers"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const developers = await fetchAPI("/developers", {
        filters: {slug: params.slug},
        populate: {
            contributors: {populate: "*"},
        },
    });

    return {
        props: {
            item: developers.data[0],
        },
        revalidate: 1,
    };
}


