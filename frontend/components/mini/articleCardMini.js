import React from "react";
import Link from "next/link";
import {PersonCardTiny} from "./personCardTiny";
import {getStrapiMedia} from "../../lib/media";
import Image from "next/image";

export function ArticleCardMini({item, section}) {

    return (
        <article className={"col-span-3"}>
            <div className="p-card-inner">

                <div className="flex flex-col gap-3">
                    <Link href={{pathname: `/${section}/${item.slug}`}}>
                        <div className={"cursor-pointer"}>
                            <h2 className={"txt-secondary internal-link"}>{item.name}</h2>
                            {item.coverImage && <div><Image src={getStrapiMedia(item.coverImage)} width={300} height={200} className={"object-cover"}/></div>}
                        </div>
                    </Link>

                    <div className={"text-sm"}>{item.description}</div>

                    {item.people && <article className="flex gap-x-6">
                        {item.people.data.map((person, i) => (
                            <PersonCardTiny person={person.attributes} key={i}/>
                        ))}
                    </article>}
                    {item.date && <div className={"text-sm"}>{item.date}</div>}
                </div>

            </div>
        </article>
    );
}
