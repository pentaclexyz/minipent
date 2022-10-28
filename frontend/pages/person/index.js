import Layout from "../../components/layouts/layout";
import { fetchAPI } from "../../lib/api";
export default function PersonOverview({ data }) {
  return (
    <Layout>
      <h1 className={"m-6"}>People</h1>

      <ul className="grid grid-cols-12 gap-3 px-6 my-8 md:grid-cols-6 lg:grid-cols-12">
        {data?.map((e) => (
          <li
            className="col-span-2 px-3 py-2 rounded border md:col-span-3 lg:col-span-4"
            key={e.id}
          >
            <h3 className="text-lg truncate"> {e.attributes.name}</h3>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
export async function getStaticProps() {
  const data = (await fetchAPI("/people")).data;
  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}
