import {getStrapiMedia} from "../../lib/media";

export function PersonCardTiny({person}) {
    return (
        <a href={`https://www.twitter.com/${person.twitter}`}
               rel="nofollow noreferrer noopener" target={"_blank"}
               className="flex flex-col rounded-2xl cursor-pointer align-baseline">
        <img className={"rounded-full w-8 p-0 mr-1"} alt={person.name} src={getStrapiMedia(person.avatar)}/>
        <div className={"text-sm pt-2 hover:underline"}>@{person.twitter}</div>
    </a>);
}
