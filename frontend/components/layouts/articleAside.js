import {PersonCardTiny} from "../cardsMini/personCardTiny";
import React from "react";
import {getStrapiMedia} from "../../lib/media";

export function ArticleAside({item}) {
    return (
        <aside>
            <div>
                {item.coverImage && (
                <div className={"col-span-1"}>
                    <img className={"rounded-full"} alt={item.name} src={getStrapiMedia(item.coverImage)}/>
                </div>
                )}
                {item.people && (<div className={"flex gap-x-4"}>
                    {item.people.data.map((person, i) => (
                        <PersonCardTiny person={person.attributes} key={i}/>
                    ))}
                </div>)}
            </div>
        </aside>
);
}
