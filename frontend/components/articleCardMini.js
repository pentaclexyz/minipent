import React from "react";
import Link from "next/link";
import {PersonCardTiny} from "./personCardTiny";

export function ArticleCardMini({article}) {

    return (
        <article className={"col-span-3"}>
            <div className="flex flex-col p-card-inner">

                <div className="flex flex-col gap-3 mt-auto">
                    <div className={"flex justify-between"}>
                        <Link href={{pathname: `/articles/${article.slug}`}}>
                            <h2 className={"cursor-pointer txt-secondary internal-link py-2"}>{article.name}</h2>
                        </Link>
                    </div>

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
