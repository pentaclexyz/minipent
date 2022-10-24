import React from "react";
import Link from "next/link";
import {PersonCardTiny} from "./personCardTiny";
import {getStrapiMedia} from "../lib/media";

export function ArticleCardMini({article}) {

    return (
        <article className={"col-span-3"}>
            <div className="p-card-inner">

                <div className="flex flex-col gap-3">
                    <Link href={{pathname: `/articles/${article.slug}`}}>
                        <div className={"cursor-pointer"}>
                            <h2 className={"txt-secondary internal-link"}>{article.name}</h2>
                            <img className={"object-cover w-80 h-48"} src={getStrapiMedia(article.coverImage)}/>
                        </div>
                    </Link>

                    <div className={"text-sm"}>{article.description}</div>

                    <article className="flex gap-x-6">
                        {article.people.data.map((person, i) => (
                            <PersonCardTiny person={person.attributes} key={i}/>
                        ))}
                    </article>
                    <div className={"text-sm"}>{article.date}</div>
                </div>

            </div>
        </article>
    );
}
