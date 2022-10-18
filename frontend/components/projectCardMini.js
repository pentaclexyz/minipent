import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {IsFavorite, IsNotFavorite} from "./favorite";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function ProjectCardMini({item}) {

    return (
        <article className="flex flex-col justify-start col-span-4 gap-2 p-card-inner rounded-2xl">
            <div>
                <Link href={{pathname: `/projects/${item.slug}`}}>
                    <h2 className={"cursor-pointer internal-link py-2"}>{item.name}</h2>
                </Link>
            </div>
            <div className={"text-sm line-clamp-3"}>{item.description}</div>
            <div>
                <a href={item.url} rel="nofollow noreferrer noopener" target={"_blank"}
                   className={"line-clamp-2"}>
                    <p className={"text-sm cursor-pointer hover:txt-secondary line-clamp-1 external-link"}>
                        {removeTrailingSlash(item.url?.split("//")[1])}
                    </p>
                </a>
                {item.twitterId && (
                    <a href={`https://www.twitter.com/${item.twitterId}`} rel="nofollow noreferrer noopener"
                       target={"_blank"} className={"line-clamp-2"}>
                        <p className={"text-sm cursor-pointer hover:txt-secondary line-clamp-1 external-link"}>
                            {removeTrailingSlash(item.twitterId?.split("//")[1])}
                        </p>
                    </a>)}
            </div>
        </article>
    );
}
