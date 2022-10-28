import {PersonCardTiny} from "../mini/personCardTiny";
import React from "react";

export function ArticleAside({item}) {
    return (
        <aside>
            {item.people && (<div className={"flex gap-x-4"}>
                {item.people.data.map((person, i) => (
                    <PersonCardTiny person={person.attributes} key={i}/>
                ))}
            </div>)}
        </aside>
    );
}
