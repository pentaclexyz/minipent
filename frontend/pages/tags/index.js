import Layout from "../../components/layout";
import {fetchAPI} from "../../lib/api";
import Link from "next/link";

export default function TagsOverview({tags}) {
  return (
    <Layout>
      <h1>tags</h1>
      <div className="grid grid-cols-12 gap-3 my-8 md:grid-cols-6 lg:grid-cols-12">
        {tags?.data.map((tag, i) => (
          <Link href={{pathname: `/tags/${tag.attributes.slug}`}} key={i}>
            <article
              className="col-span-2 px-3 py-2 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 internal-link md:col-span-3 lg:col-span-4"
              key={tag.id}>
              <h3 className="text-lg truncate"> {tag.attributes.name}</h3>
            </article>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const matchingTags = await fetchAPI("/tags", {
      sort: ["name"],
    }
  );

  return {
    props: {
      tags: matchingTags,
    },
    revalidate: 1,
  };
}
