import Layout from "../../components/layouts/layout";
import {fetchAPI} from "../../lib/api";
import {IntroCard} from "../../components/cards/introCard";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/layouts/cardContainerLayout";
import {ArticleCardMini} from "../../components/cardsMini/articleCardMini";

export default function ProjectOverview({intros, projects}) {
    const seo = {metaTitle: "Projects"};

    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Projects</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
            <CardContainerLayout>
                {projects.data.map((project, i) => (
                    <ArticleCardMini item={project.attributes} section={"projects"} key={i}/>
                ))}
            </CardContainerLayout>
        </Layout>
    );
}

export async function getStaticProps() {

    const projectpage = await fetchAPI("/projectpage", {
        populate: {
            intros: {populate: "*"},
            projects: {populate: "*"},
        },
    });

    return {
        props: {
            intros: projectpage.data.attributes.intros,
            projects: projectpage.data.attributes.projects,
        },
        revalidate: 1,
    };
}