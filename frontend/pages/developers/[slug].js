import {fetchAPI} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import ReactMarkdown from "react-markdown";


const Contributor = ({item}) => {
    const seo = {
        metaTitle: item?.attributes?.name,
        metaDescription: `Details for item ${item?.attributes?.name}`,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <section>
                <h1>{item?.attributes?.name}</h1>
                <article className={"pb-6"}>
                    <ReactMarkdown>{item?.attributes?.details}</ReactMarkdown>
                </article>
                <article className={"pb-6"}>
                    <ReactMarkdown>{item?.attributes?.planning}</ReactMarkdown>
                </article>
            </section>
            <aside>
                <p></p>
            </aside>
        </Layout>
    );
};

export default Contributor;

export async function getStaticPaths() {
    return {
        // paths: await getSlugsForPath("items"),
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps({params}) {
    try {
        const matchingitems = await fetchAPI("/items", {
            filters: {slug: params.slug},
        });
        return {
            props: {
                item: matchingitems.data[0],
            },
            revalidate: 1,
        };
    } catch (e) {
        return {
            props: {
                item: {},
            },
            revalidate: 1,
        };
    }
}
