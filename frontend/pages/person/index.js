import Layout from "../../components/layouts/layout";
import { fetchAPI } from "../../lib/api";
export default function PersonOverview({ people }) {
  return (
    <Layout>
      <h1 className={"m-6"}>People</h1>

      <ul className="grid grid-cols-12 gap-3 px-6 my-8 md:grid-cols-6 lg:grid-cols-12">
        {people?.map((person) => (
          <li className="col-span-2 px-3 py-2 rounded border md:col-span-3 lg:col-span-4" key={person.id}>
            <h3 className="text-lg truncate"> {person.attributes.name}</h3>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
export async function getStaticProps() {
  const people = (await fetchAPI("/people")).data;
  return {
    props: {people,},
    revalidate: 1,
  };
}
