import {fetchAPI, getSlugsForPath} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import ProjectCard from "../../components/card/projectCard";

const Project = ({project}) => {
    const seo = {
        metaTitle: project.attributes.name,
    };

    return (
        <Layout>
            <Seo seo={seo}/>
            <ProjectCard project={project.attributes} id={project.id}/>
        </Layout>
    );
};

export default Project;

export async function getStaticPaths() {
    return {
        paths: await getSlugsForPath("projects"),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const projects = await fetchAPI("/projects", {
        filters: {slug: params.slug},
        populate: {
            coverImage: {populate: "*"},
            headings: {populate: "*"},
        },
    });

    return {
        props: {
            project: projects.data[0],
        },
        revalidate: 1,
    };
}