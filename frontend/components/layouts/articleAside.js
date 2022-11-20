import {PersonCardTiny} from "../cardsMini/personCardTiny";
import React from "react";
import {getStrapiMedia} from "../../lib/media";
import {ArticleCardMini} from "../cardsMini/articleCardMini";

export function ArticleAside({item}) {

    // const coverImage = item.coverImage ? getStrapiMedia(item.coverImage) : null;

    return (
        <aside>
            <div>
                {/*{coverImage && (*/}
                {/*    <div className={"col-span-1"}>*/}
                {/*        <img className={"rounded-full"} alt={item.name} src={getStrapiMedia(item.coverImage)}/>*/}
                {/*    </div>*/}
                {/*)}*/}
                {item.projects && (<div className={"flex gap-x-4 py-6"}>
                    {item.projects.data.map((project, i) => (
                        <ArticleCardMini item={project.attributes} key={i} section={"projects"}/>
                    ))}
                </div>)}
                {item.people && (<div className={"flex gap-x-4"}>
                    {item.people.data.map((person, i) => (
                        <PersonCardTiny person={person.attributes} key={i}/>
                    ))}
                </div>)}
            </div>
        </aside>
);
}
