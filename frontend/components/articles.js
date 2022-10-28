import React, {useMemo, useState} from "react";
import ArticleCard from "./cards/articleCard";

const LOWER_LIMIT = 3;
const UPPER_LIMIT = 15;
const Articles = (
  {articles = [], maxSize = UPPER_LIMIT, minSize = LOWER_LIMIT}
) => {
  const [limit, setLimit] = useState(minSize);
  const shownArticles = useMemo(
    () => articles.slice(0, limit),
    [articles, limit]
  );

  return articles.length ? (
    <article className="rounded-lg bg-white/10">

      <div className="relative mx-6">
        <div className="flex flex-row justify-between">
          <h2 className="py-4">related articles</h2>

          {articles.length > minSize && (
            <button className="flex justify-between items-center w-20 text-xs text-center"
                    onClick={() => {
                      setLimit(limit === minSize ? maxSize : minSize);
                    }}>
              view {limit === minSize ? "all" : "less"}
              <svg xmlns="http://www.w3.org/2000/svg"
                   className={`inline w-6 h-6 ${limit === minSize ? "" : "rotate-180"}`}
                   viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <ul>
        {shownArticles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article.attributes}/>
          </li>
        ))}
      </ul>
    </article>
  ) : (
    <></>
  );
};

export default Articles;
