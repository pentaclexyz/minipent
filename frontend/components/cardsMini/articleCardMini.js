import React from "react";
import Link from "next/link";
import {PersonCardTiny} from "./personCardTiny";
import {getStrapiMedia} from "../../lib/media";
import Image from "next/image";
import StyledLink from "../nav/styledLink";

export function ArticleCardMini({item, section}) {

    function removeTrailingSlash(str = "") {
        return str.replace(/\/+$/, "");
    }

    const coverImage = item.coverImage

    return (
        <article className={"col-span-3"}>
            <div className="p-card-inner">

                <div className="flex flex-col gap-3">

                    <Link href={{pathname: `/${section}/${item.slug}`}}>
                        <div className={"cursor-pointer"}>
                            <h2 className={"txt-secondary internal-link"}>{item.name}</h2>
                        </div>
                    </Link>
                    <StyledLink url={item.url} text={item.url}/>
                    {coverImage &&
                        <div><Image src={getStrapiMedia(item.coverImage)} className={"object-cover"} width={300}
                                    height={200}/></div>
                    }
                    {item.description && <div className={"text-sm"}>{item.description}</div>}
                    {item.date && <div className={"text-sm"}>{item.date}</div>}
                    {item.people && <article className="flex gap-x-6">
                        {item.people.data.map((person, i) => (
                            <PersonCardTiny person={person.attributes} key={i}/>
                        ))}
                    </article>}

                </div>
            </div>
        </article>
    );
}