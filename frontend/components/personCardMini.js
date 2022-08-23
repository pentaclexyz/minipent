import {getStrapiMedia} from "../lib/media";

export function PersonCardMini({person}) {
    return (
        <a href={`https://www.twitter.com/${person.twitter}`}
               rel="nofollow noreferrer noopener" target={"_blank"}
               className="flex flex-col p-4 mb-4 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10 align-baseline">
        <img className={"rounded-full w-16 mb-4"} src={getStrapiMedia(person.avatar)}/>
        <div>@{person.twitter}</div>
    </a>);
}
