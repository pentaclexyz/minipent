import {fetchAPI, getSearchFilterProps} from "../lib/api";
import Link from "next/link";
import Layout from "../components/layout";
import Search from "../components/search/search";
import Seo from "../components/seo";
import {IntroCard} from "../components/introCard";


// const API_ENDPOINTS = ["projects", "planning", "contributors", "events", "news", "articles"];
const API_ENDPOINTS = ["contributors", "news", "articles"];

const Index = ({homeFeatures, intros, search}) => {
    const seo = {metaTitle: "Home"};

    return (
        <Layout>
            <Seo seo={seo}/>
            <Search initialValues={search}/>
            {intros.map((intro, i) => (<IntroCard intro={intro} key={i}/>))}

            <article className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-y-12 md:gap-x-8">
                {homeFeatures.map((homeFeature) => (
                    <Link key={homeFeature.id} href={homeFeature.link}>
                        <article id={`homeFeature-card-${homeFeature.id}`}
                                 className="rounded-2xl cursor-pointer p-card-inner internal-link">
                            <h2 className="pt-0">{homeFeature.header}</h2>
                            <p className="text-sm">{homeFeature.text}</p>
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
            intros: {populate: "*"},
            homeFeatures: {populate: "*"},
        },
    });

    const getSearchProps = async () => {
        const apiPromises = API_ENDPOINTS.map((name) =>
            fetchAPI(`/${name}`, getSearchFilterProps(name, ""))
                .catch(() => ({data: [], name}))
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
            intros: response.data.attributes.intros,
            search: await getSearchProps(),
        },
    };
}

