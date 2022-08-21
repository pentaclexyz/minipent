import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {IsFavorite, IsNotFavorite} from "./favorite";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function ProjectCardMini({item}) {

    return (
        <div
            className="flex flex-col justify-between col-span-4 gap-2 px-6 pt-6 pb-6 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10">

            <Link href={{pathname: `/projects/${item.slug}`}}>
                <h2 className={"cursor-pointer text-color-secondary-700 fave-link py-0"}>{item.name}</h2>
            </Link>

            <div>{item.coverImage}</div>
            <div className={"text-sm line-clamp-3"}>{item.description}</div>
            <div>
                <a href={item.url} rel="nofollow noreferrer noopener" target={"_blank"}
                   className={"line-clamp-2"}>
                    <p className={"text-sm cursor-pointer hover:text-color-secondary-700 line-clamp-1 external-link"}>
                        {removeTrailingSlash(item.url?.split("//")[1])}
                    </p>
                </a>
                {item.twitterId && (
                    <a href={`https://www.twitter.com/${item.twitterId}`} rel="nofollow noreferrer noopener"
                       target={"_blank"}
                       className={"line-clamp-2"}>
                        <p className={"text-sm cursor-pointer hover:text-color-secondary-700 line-clamp-1 external-link"}>
                            @{item.twitterId}
                        </p>
                    </a>)}
            </div>
        </div>
    );
}
