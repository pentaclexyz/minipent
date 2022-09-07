import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ProjectCardMini} from "../../components/projectCardMini";
import ReactMarkdown from "react-markdown";
import {getStrapiMedia} from "../../lib/media";

export default function ProjectOverview({intros, projects}) {
  return (
    <Layout>
      <h1>Projects</h1>
        {intros.map((intro, i) => (
            <article className={"grid mt-2 md:mt-6 lg:mt-10 md:gap-x-10 md:grid-cols-2 lg:gap-x-20"} key={i}>
                <div className={"col-span-1 mb-10"}>
                    <h1 className={"text-4xl"}>{intro.title}</h1>
                    <ReactMarkdown>{intro.content}</ReactMarkdown>
                </div>
                <div className={"col-span-1"}>
                    <img className={"rounded-full"} src={getStrapiMedia(intro.image)}/>
                </div>
            </article>
        ))}
      <div className="grid gap-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {projects.data.map((project, i) => (
            // <p key={i}>{project.attributes.name}</p>
            <ProjectCardMini item={project.attributes} key={i} />
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
//
// return {
//     props: {
//         homeFeatures: response.data.attributes.homeFeatures,
//         headings: response.data.attributes.headings,
//         search: await getSearchProps(),
//     },
// };