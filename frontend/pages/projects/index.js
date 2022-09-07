import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import {ProjectCardMini} from "../../components/projectCardMini";

export default function ProjectOverview({projects}) {
  return (
    <Layout>
      <h1>Projects</h1>
      <div className="grid gap-4 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
        {projects.map((project, i) => (
            <ProjectCardMini item={project.attributes} key={i} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {

    const projects = await fetchAPI("/projectpage", {
        populate: {
            projects: {populate: "*"},
            intros: {populate: "*"},
        },
    });

  return {
    props: {
      projects: projects.data,
      intros: projects.data,
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