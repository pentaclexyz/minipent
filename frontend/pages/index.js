import {fetchAPI, getSearchFilterProps} from "../lib/api";
import Link from "next/link";
import Layout from "../components/layouts/layout";
import Search from "../components/search/search";
import Seo from "../components/seo";
import {IntroCard} from "../components/cards/introCard";
import CardContainerLayout from "../components/layouts/cardContainerLayout";


// const API_ENDPOINTS = ["projects", "planning", "contributors", "events", "news", "articles"];
const API_ENDPOINTS = ["projects", "news", "contributors", "articles", "events"];

const Index = ({homeFeatures, intros, search}) => {
    const seo = {metaTitle: "Home"};

    return (
        <Layout>
            <Seo seo={seo}/>
            <Search initialValues={search}/>
            {intros.map((intro, i) => (<IntroCard intro={intro} key={i}/>))}
            <CardContainerLayout>
                {homeFeatures.map((homeFeature) => (
                    <Link key={homeFeature.id} href={homeFeature.link}>
                        <article id={`homeFeature-card-${homeFeature.id}`} className="col-span-3 cursor-pointer p-card-inner internal-link">
                            <h2>{homeFeature.header}</h2>
                            <p className="text-sm">{homeFeature.text}</p>
                        </article>
                    </Link>
                ))}
            </CardContainerLayout>
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

