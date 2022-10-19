import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ProjectCardMini} from "../../components/projectCardMini";
import {IntroCard} from "../../components/introCard";
import Seo from "../../components/seo";
import CardContainerLayout from "../../components/cardContainerLayout";

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
                    <ProjectCardMini item={project.attributes} key={i}/>
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