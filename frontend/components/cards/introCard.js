import ReactMarkdown from "react-markdown";
import {getStrapiMedia} from "../../lib/media";

export function IntroCard({intro}) {

    return (
        <article className={"grid md:gap-x-10 md:grid-cols-2 lg:gap-x-20"}>
            <div className={"col-span-1 mb-10 editorial"}>
                <h1 className={"text-4xl"}>{intro.title}</h1>
                <ReactMarkdown>{intro.content}</ReactMarkdown>
            </div>
            <div className={"col-span-1"}>
                <img className={"rounded-full"} alt={intro.name} src={getStrapiMedia(intro.image)}/>
            </div>
        </article>
    );
}
