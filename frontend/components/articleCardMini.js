import Link from "next/link";
import {useFavorites} from "../contexts/FavoriteContext";
import {IsFavorite, IsNotFavorite} from "./favorite";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function ArticleCardMini({item}) {

    return (
        <article className={"col-span-3"}>
            <div className="flex flex-col p-card-inner">

                <div className="flex flex-col gap-3 mt-auto">
                    <div className={"flex justify-between"}>
                        <Link href={{pathname: `/articles/${item.slug}`}}>
                            <h2 className={"cursor-pointer txt-secondary internal-link py-2"}>{item.name}</h2>
                        </Link>
                    </div>
                    <div className={"text-sm"}>{item.description}</div>
                </div>
            </div>
        </article>
    );
}
