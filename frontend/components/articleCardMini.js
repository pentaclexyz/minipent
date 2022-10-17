import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {IsFavorite, IsNotFavorite} from "./favorite";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function ArticleCardMini({item}) {

    return (
        <article className={"col-span-3"}>
            <div className="flex flex-col px-6 pt-6 pb-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10">

                <div className="flex flex-col gap-3 mt-auto">
                    <div className={"flex justify-between"}>
                        <Link href={{pathname: `/articles/${item.slug}`}}>
                            <h2 className={"cursor-pointer txt-secondary fave-link py-0"}>{item.name}</h2>
                        </Link>
                    </div>
                    <div className={"text-sm"}>{item.description}</div>
                    <div>
                        <a href={item.url} rel="nofollow noreferrer noopener" target={"_blank"}
                           className={"line-clamp-2"}>
                            <p className={"text-sm cursor-pointer hover:txt-secondary line-clamp-1 external-link"}>
                                {removeTrailingSlash(item.url?.split("//")[1])}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
