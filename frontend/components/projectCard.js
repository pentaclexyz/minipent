import {getStrapiMedia} from "../lib/media";
import StyledLink from "./styledLink";
import LinkLaunch from "./linkLaunch";
import BackLink from "./backLink";
import ReactMarkdown from "react-markdown";

export default function ProjectCard({project}) {
    return (
        <section>
            <BackLink link={"/projects"} title={"Projects"}/>
            <h1>{project.name}</h1>

            <article className={"grid grid-cols-12 gap-x-8"}>
                <div className="col-span-9">
                    <img className={"rounded-2xl"} src={getStrapiMedia(project.coverImage)}/>
                </div>

                <div className="col-span-3 text-sm">
                    <LinkLaunch url={project.url} text={project.url}/>
                    <article className={"pt-2 editorial"}><ReactMarkdown>{project.description}</ReactMarkdown></article>
                </div>
            </article>
        </section>
    );
}
