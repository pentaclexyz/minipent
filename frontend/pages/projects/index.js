import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ProjectCardMini} from "../../components/projectCardMini";
import {IntroCard} from "../../components/introCard";
import Seo from "../../components/seo";

export default function ProjectOverview({intros, projects}) {
    const seo = {metaTitle: "Projects"};

    return (
        <Layout>
            <Seo seo={seo}/>
            <h1>Projects</h1>
            {intros.map((intro, i) => (
                <IntroCard intro={intro} key={i}/>
            ))}
            <div className="grid gap-16 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                {projects.data.map((project, i) => (
                    <ProjectCardMini item={project.attributes} key={i}/>
                ))}
            </div>
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