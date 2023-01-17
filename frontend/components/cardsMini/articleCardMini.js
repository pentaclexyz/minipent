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
    const web = "https://pentacle.xyz/images/icons/web.svg"
    const twitter = "https://pentacle.xyz/images/icons/twitter.svg"
    const github = "https://pentacle.xyz/images/icons/github.svg"

    return (
        <article className={"col-span-3"}>
            <div className="p-card-inner">

                <div className="flex flex-col gap-3">

                    <Link href={{pathname: `/${section}/${item.slug}`}}>
                        <div className={"cursor-pointer"}>
                            <h2 className={"txt-secondary internal-link"}>{item.name}</h2>
                        </div>
                    </Link>

                    {item.url && <StyledLink url={item.url} text={item.url} icon={web}/>}
                    {item.twitterId && <StyledLink url={item.twitterId} text={item.twitterId} icon={twitter}/>}
                    {item.githubRepo && <StyledLink url={item.githubRepo} text={item.githubRepo} icon={github}/>}
                    {item.coverImage &&
                        <Link href={{pathname: `/${section}/${item.slug}`}}>
                            <div><img src={getStrapiMedia(item.coverImage)} className={"object-cover cursor-pointer"}
                                        width={300}
                                        height={200}/></div>
                        </Link>
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
