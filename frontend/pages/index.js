import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Layout from "../components/layout";
import Search from "../components/search/search";
import Seo from "../components/seo";
import {fetchAPI, getSearchFilterProps} from "../lib/api";
import {useFavorites} from "../contexts/FavoriteContext";
import {useEffect, useMemo, useState} from "react";
import {getStrapiMedia} from "../lib/media";


const API_ENDPOINTS = ["tags", "projects", "articles", "news"];

const Index = ({homeFeatures, headings, search}) => {
    const seo = {
        metaTitle: "home",
    };

    const {faves, addFave, removeFave} = useFavorites();
    const [limit, setLimit] = useState(8);
    const [resolvedFaves, setResolvedFaves] = useState([]);
    const shownFaves = useMemo(
        () => resolvedFaves.slice(0, limit),
        [resolvedFaves, limit]
    );

    useEffect(() => {
        (async () => {
            const projectIds = Object.entries(faves)
                .filter(([key, value]) => key.includes("project:"))
                .map(([key]) => key.split(":")[1]);

            if (projectIds.length) {
                const results = (
                    await Promise.allSettled(
                        projectIds.map((id) =>
                            fetchAPI(`/projects/${id}`, {populate: "*"})
                        )
                    )
                )
                    .filter((r) => r.status === "fulfilled")
                    .map((r) => ({...r.value.data.attributes, id: r.value.data.id, key: r.value.data.id}));

                setResolvedFaves(results);
            }
        })();
    }, [faves]);

    return (
        <Layout>
            <Seo seo={seo}/>

            <Search initialValues={search}/>

            {headings.map((heading, i) => (
                <article className={"grid mt-2 md:mt-6 lg:mt-10 md:gap-x-10 md:grid-cols-2 lg:gap-x-20"} key={"i"}>
                    <div className={"col-span-1 mb-10"}>
                        <h1 className={"text-4xl"}>{heading.title}</h1>
                        <ReactMarkdown>{heading.intro}</ReactMarkdown>
                    </div>
                    <div className={"col-span-1"}>
                        <img className={"rounded-full"} src={getStrapiMedia(heading.image)}/>
                    </div>
                </article>
            ))}

            <article className="mt-6 grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {homeFeatures.map((homeFeature) => (
                    <Link key={homeFeature.id} href={homeFeature.link}>
                        <article id={`homeFeature-card-${homeFeature.id}`}
                                 className="rounded-2xl bg-white/5 cursor-pointer hover:border-p-green-400 p-10 hover:bg-white/10 internal-link">
                            <h2 className="pt-0">{homeFeature.header}</h2>
                            <p className="text-sm">
                                {homeFeature.text}
                            </p>
                        </article>
                    </Link>
                ))}
            </article>
        </Layout>
    );
};

export default Index;


export async function getServerSideProps({res}) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=59"
    );
    const response = await fetchAPI(`/homepage`, {
        populate: {
            headings: {populate: "*"},
            homeFeatures: {populate: "*"},
        },
    });

    const getSearchProps = async () => {
        const apiPromises = API_ENDPOINTS.map((name) =>
            fetchAPI(`/${name}`, getSearchFilterProps(name, ""))
                .catch(() => ({data: [], name}))
                // add category name for display purposes
                .then((res) => ({...res, name}))
        );

        const allFetchedResults = await Promise.allSettled(apiPromises);
        const values = allFetchedResults
            .filter((r) => r.status === "fulfilled" && r.value.data.length)
            .map((r) => r.value);

        return values;
    };

    return {
        props: {
            homeFeatures: response.data.attributes.homeFeatures,
            headings: response.data.attributes.headings,
            search: await getSearchProps(),
        },
    };
}

