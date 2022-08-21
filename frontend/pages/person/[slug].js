import Articles from "../../components/articles";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Projects from "../../components/projects";
import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon";
import Link from "next/link";

const Person = ({ person }) => {
  const seo = {
    metaTitle: person.attributes.name,
    metaDescription: `All ${person.attributes.name} articles`,
  };

  return (
    <Layout>
      <Seo seo={seo} />

      <Link href={"/event"} passHref>
        <a className="flex flex-row items-center mt-5 text-sm">
          <ArrowLeftIcon width={16} height={16} />
          <span className="ml-3">all people</span>
        </a>
      </Link>
      <article
        className={"flex flex-row flex-wrap gap-2 px-8 py-6 pb-2 text-sm"}
      >
        <h1 className="relative">
          {person.attributes.name}
          <span className="absolute top-1 px-2 py-1 ml-8 text-xs text-indigo-900 rounded-md border border-indigo-900">
            person
          </span>
        </h1>
      </article>

      {!!person.attributes.projects.data.length && (
        <section className="p-6 pt-4 mx-auto max-w-7xl">
          <Projects projects={person.attributes.projects.data} />
        </section>
      )}
      {!!person.attributes.articles.data.length && (
        <div className={"p-6 max-w-sm"}>
          <Articles articles={person.attributes.articles.data} />
        </div>
      )}
    </Layout>
  );
};

export default Person;

export async function getStaticPaths() {
  // const personsRes = await fetchAPI("/persons", { fields: ["slug"] });

  return {
    paths: [].map((person) => ({
      params: {
        slug: person.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const matchingPersons = await fetchAPI("/persons", {
    filters: { slug: params.slug },
    populate: {
      articles: { populate: "*" },
      projects: { populate: "*" },
    },
  });
  return {
    props: {
      person: matchingPersons.data[0],
    },
    revalidate: 1,
  };
}
