import {useRouter} from "next/router";
import {fetchAPI} from "../../lib/api";
import Layout from "../../components/layouts/layout";
import Seo from "../../components/seo";
import Projects from "../../components/projects";
import Link from "next/link";

const Tag = ({tag}) => {
  const seo = {
    metaTitle: tag.attributes.name,
    metaDescription: `Tag: ${tag.attributes.name}`,
  };

  const router = useRouter();

  return (
    <Layout>
      <Seo seo={seo}/>

      <article className={"md:flex md:justify-between mb-4"}>
        <h1><Link href={"/tags"} passHref><span
          className={"hover:txt-primary cursor-pointer"}>tags</span></Link> / {tag.attributes.name}</h1>
        <p className={"mt-4 text-sm"}>{tag.attributes.description}</p>
      </article>

      <section className={`grid-cols-12 gap-6 ${!!tag.attributes.articles?.data?.length && "lg:grid"}`}>

        <article className={"col-span-8"}>
          <article className="mx-auto max-w-7xl">
            <Projects projects={tag.attributes.projects.data}/>
          </article>
        </article>

        <article className={"col-span-4"}>
          {/*<Articles articles={tag.attributes.articles.data}/>*/}
        </article>
      </section>
    </Layout>
  );
};

export default Tag;

export async function getStaticPaths() {
  const tagsRes = await fetchAPI("/tags", {fields: ["slug"]});

  return {
    paths: tagsRes.data
      .filter((tag) => tag.attributes.slug)
      .map((tag) => ({
        params: {
          slug: tag.attributes.slug,
        },
      })),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const matchingTags = await fetchAPI("/tags", {
    filters: {slug: params.slug},
    populate: {
      articles: {populate: "*"},
      projects: {populate: "*"},
    },
  });
  return {
    props: {
      tag: matchingTags.data[0],
    },
    revalidate: 1,
  };
}
