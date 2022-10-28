import { useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import { useFavorites } from "../../contexts/FavoriteContext";
import { fetchAPI } from "../../lib/api";
import {ArticleCardMini} from "../../components/mini/articleCardMini";

export default function FavoriteOverview() {
  const { faves } = useFavorites();
  const [resolvedFaves, setResolvedFaves] = useState([]);

  useEffect(() => {
    (async () => {
      const projectIds = Object.entries(faves)
        .filter(([key, value]) => key.includes("project:"))
        .map(([key]) => key.split(":")[1]);

      if (projectIds.length) {
        const results = (
          await Promise.allSettled(
            projectIds.map((id) =>
              fetchAPI(`/projects/${id}`, { populate: "*" })
            )
          )
        )
          .filter((r) => r.status === "fulfilled")
          .map((r) => ({ ...r.value.data.attributes, id: r.value.data.id }));

        setResolvedFaves(results);
      }
    })();
  }, [faves]);

  return (
    <>
      <Layout>
        <h2 className="px-3 my-3 text-xl">Favorites</h2>
        <div className="grid grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-4">
          {resolvedFaves.map((project, i) => (
            <ArticleCardMini item={project} key={i} />
          ))}
        </div>
      </Layout>
    </>
  );
}
