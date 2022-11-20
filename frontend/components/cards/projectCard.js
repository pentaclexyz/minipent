import {getStrapiMedia} from "../../lib/media";
import LaunchLink from "../nav/launchLink";
import BackLink from "../nav/backLink";
import ReactMarkdown from "react-markdown";

export default function ProjectCard({project}) {
    return (
        <section>
            <BackLink link={"/projects"} title={"Projects"}/>
            <h1>{project.name}</h1>

            <article className={"grid grid-cols-12 gap-x-8"}>
                <div className="col-span-9">
                    <img className={"rounded-2xl p-6 border border-dashed border-primary"} alt={project.name} src={getStrapiMedia(project.projectImage)}/>
                </div>

                <div className="col-span-3 text-sm">
                    <LaunchLink url={project.url} text={project.url}/>
                    <article className={"pt-2 editorial"}><ReactMarkdown>{project.description}</ReactMarkdown></article>
                    <article className={"pt-4 editorial"}><ReactMarkdown>{project.content}</ReactMarkdown></article>
                </div>
            </article>
        </section>
    );
}
