import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {IsFavorite, IsNotFavorite} from "./favorite";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function PlanningCardMini({item}) {

    return (
        <article className={"col-span-3"}>
            <div className="flex flex-col p-card-inner">
                <div>
                    <Link href={{pathname: `/planning/${item.slug}`}}>
                        <h2 className={"cursor-pointer txt-secondary internal-link py-2"}>{item.name}</h2>
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
        </article>
    );
}
