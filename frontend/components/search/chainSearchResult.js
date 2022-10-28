import { useMemo } from "react";
import { AllowedLink } from "../nav/allowedLink";

const ChainSearchResult = ({ result, group, slug, price }) => {
  const description = useMemo(
    () =>
      result?.attributes?.description && (
        <>
          <div className="my-2 text-s line-clamp-3">
            {result?.attributes?.description?.slice(0, 100)}
            {result?.attributes?.description?.length > 100 && "..."}
          </div>
        </>
      ),
    [result?.attributes?.description]
  );

  const shortenedTitle = useMemo(() => {
    const title = result?.attributes?.name || result?.attributes?.title;
    if (title.length > 30) {
      return `${title?.slice(0, 27)}...`;
    } else {
      return title;
    }
  }, [result?.attributes?.name, result?.attributes?.title]);

  return (
    <AllowedLink group={group} slug={slug}>
      <div className="w-full search-result">
        <div className="flex flex-row gap-3 items-center w-full">
          {result.attributes.ticker && group === "chains" && (
            <img src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/${result.attributes.ticker}.png`}
              style={{ width: 20, height: 20 }} alt={result.attributes.ticker}
              // Fallback image
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/think.svg";
              }}
            />
          )}
          {shortenedTitle}
          {description}

          {!!result.attributes.categories?.data?.length ||
            (!!result.attributes.ticker && (
              <>
                <div className="flex flex-row gap-2 justify-end mt-auto">
                  {!!result.attributes.categories?.data?.length &&
                    // hacky: just use first item to avod UI issues
                    [result.attributes.categories.data[0]].map((category, i) => (
                      <span
                        key={i}
                        className={`text-xs badge badge-secondary ${""}`}
                      >
                      {category.attributes.name}
                    </span>
                    ))}

                  {!!result.attributes.ticker && (
                    <span className="text-xs badge badge-outline badge-primary">
                    {result.attributes.ticker}{" "}
                      {!!price && `: $${price.toFixed(2)}`}
                  </span>
                  )}
                </div>
              </>
            ))}
        </div>

      </div>
    </AllowedLink>
  );
};

export default ChainSearchResult;
