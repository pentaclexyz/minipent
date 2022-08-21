import Select from "react-select";
import { useQuery } from "react-query";
import { useState } from "react";
import qs from "qs";
import Layout from "../components/layout";

const getProjects = async (key) => {
  const sectionId = key.queryKey[1].section;
  const categoryId = key.queryKey[2].category;

  if (sectionId && categoryId) {
    const query = qs.stringify(
      {
        filters: {
          section: {
            id: {
              $eq: sectionId,
            },
          },
          category: {
            id: {
              $eq: categoryId,
            },
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
      }/api/projects?${query}`
    );
    return res.json();
  }

  if (sectionId) {
    const query = qs.stringify(
      {
        filters: { section: { id: { $eq: sectionId } } },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
      }/api/projects?${query}`
    );
    return res.json();
  }

  if (categoryId) {
    const query = qs.stringify(
      {
        filters: { category: { id: { $eq: categoryId } } },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
      }/api/projects?${query}`
    );
    return res.json();
  }
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/api/projects`
  );
  return res.json();
};

const FilterProjects = ({ projects, sections, categories }) => {
  const [sectionId, setSectionId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  // const handleClick = (value) => {
  //   setCategoryId(value ? value.id : null)
  // }
  const { data, status } = useQuery(
    ["projects", { section: sectionId }, { category: categoryId }],
    getProjects,
    { initialData: projects.data }
  );

  return (
    <Layout>
      <section className={"flex"}>
        <article className={"flex-1"}>
          <Select
            getOptionLabel={(option) => `${option.attributes.name}`}
            getOptionValue={(option) => option.id}
            options={sections}
            instanceId={"sections"}
            placeholder={"filter by section"}
            isClearable
            onChange={(value) => setSectionId(value ? value.id : null)} // TODO set child categories on second select
          />
          <br />
          <Select
            getOptionLabel={(option) => `${option.attributes.name}`}
            getOptionValue={(option) => option.id}
            options={categories}
            instanceId={"categories"}
            placeholder={"filter by category"}
            isClearable
            onChange={(value) => setCategoryId(value ? value.id : null)}
          />
          {/*<br/>*/}
          {/*{categories.map((category, i) => (*/}
          {/*  <button onClick={handleClick} key={i}>{category.attributes.name} | {category.attributes.id}</button>*/}
          {/*))}*/}
        </article>

        <article className={"flex-1"}>
          <h2>projects</h2>
          <div>
            {status === "loading" && <p>loading</p>}
            {status === "error" && <p>we broke it</p>}

            {status === "success" &&
              data.data.map((project) => (
                <div key={project.id}>{project.attributes.name}</div>
              ))}
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default FilterProjects;

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const resProjects = await fetch(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/api/projects?${query}`
  );
  const projectsData = await resProjects.json();

  const resCategories = await fetch(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/api/categories`
  );
  const categoriesData = await resCategories.json();

  const resSections = await fetch(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/api/sections`
  );
  const sectionsData = await resSections.json();

  return {
    props: {
      projects: projectsData.data,
      categories: categoriesData.data,
      sections: sectionsData.data,
    },
  };
}
