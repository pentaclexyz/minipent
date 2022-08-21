import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCoingecko } from "../contexts/CoingeckoContext";
import { useFavorites } from "../contexts/FavoriteContext";
import { IsFavorite, IsNotFavorite } from "./favorite";
import PinSolid from "@material-design-icons/svg/filled/push_pin.svg";
import { fetchAPI, getStrapiURL } from "../lib/api";
import { useAccount, useSignMessage } from "wagmi";
function removeTrailingSlash(str = "") {
  return str.replace(/\/+$/, "");
}
export function FavoriteProjectCard({ project }) {
  const { faves, addFave, removeFave } = useFavorites();
  const { loadPrices, prices } = useCoingecko();
  const match = (name) => {
    if (name === "btc") {
      return "bitcoin";
    }
    if (name === "eth") {
      return "ethereum";
    }
    if (name === "sol") {
      return "solana";
    }
    return name;
  };

  useEffect(() => {
    if (project.coingecko_id) {
      loadPrices([match(project.coingecko_id)]);
    }
  }, [project]);

  const { address } = useAccount();
  const { signMessage, data } = useSignMessage();

  const projectPrice = useMemo(
    () => prices[match(project?.coingecko_id)]?.usd.toFixed(2),
    [project, prices]
  );

  const [isPinned, setIsPinned] = useState(
    faves[`project:${project.id}`]?.isPinned
  );

  useEffect(() => {
    if (data) {
      (async () => {
        setIsPinned(!isPinned);
        const url = getStrapiURL("/fave/setPin");
        const params = new URLSearchParams();
        params.append("owner", address);
        params.append("signature", data);
        params.append("isPinned", isPinned);
        params.append("item_id", `project:${project.id}`);

        await fetch(`${url}?${params}`);
      })();
    }
  }, [data, project, address]);

  return (
    <>
      <article className="flex flex-col p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-p-green-400">
        <div className={"flex gap-1.5 justify-between items-center"}>
          <span className="text-gray-600">
            {isPinned ? (
              <span
                onClick={() => {
                  signMessage({ message: `project:${project.id}` });
                }}
                className="material-symbols-filled"
              >
                push_pin
              </span>
            ) : (
              <span
                onClick={() => {
                  signMessage({ message: `project:${project.id}` });
                }}
                className="material-symbols-outlined"
              >
                push_pin
              </span>
            )}
          </span>
          <Link href={{ pathname: `/project/${project.slug}` }}>
            <h2 className={"underline cursor-pointer hover:text-p-green-400 underline-offset-4 decoration-p-green-400"}>
              {project.name}
            </h2>
          </Link>

          {
            <span
              data-dbid={`project:${project.id}`}
              className="mb-1.5 ml-auto cursor-pointer hover:text-indigo-400"
            >
              {faves[`project:${project.id}`] ? (
                <IsFavorite id={project.id} callback={removeFave} />
              ) : (
                <IsNotFavorite id={project.id} callback={addFave} />
              )}
            </span>
          }
        </div>

        <div className="flex flex-col gap-2">
          {!!projectPrice ? (<span className="text-sm">${projectPrice}</span>) : (<span />)}
          <a
            href={project.website_url}
            rel="nofollow noreferrer noopener"
            target={"_blank"}
            className={"line-clamp-2"}
          >
            <div className={"flex gap-3 justify-between items-center"}>
              <p className={"text-sm cursor-pointer hover:text-p-green-400"}>
                {removeTrailingSlash(project.website_url?.split("//")[1])}
              </p>
            </div>
          </a>
          <a
            href={project.twitter_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-800 cursor-pointer line-clamp-2 hover:text-p-green-400"
          >
            {removeTrailingSlash(project.twitter_url?.split("//")[1])}
          </a>
        </div>
      </article>
    </>
  );
}
