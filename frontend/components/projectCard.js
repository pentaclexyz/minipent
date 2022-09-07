import {getStrapiMedia} from "../lib/media";
import StyledLink from "./styledLink";
import LinkLaunch from "./linkLaunch";
import BackLink from "./backLink";

export default function ProjectCard({project}) {
    return (
        <section className={"rounded-2xl bg-white/10 p-8"}>
            <BackLink link={"/projects"} title={"Projects"}/>
            <h1>{project.name}</h1>

            <article className={"grid grid-cols-12 gap-x-8"}>
                <article className="col-span-9">
                    <img className={"rounded-2xl"} src={getStrapiMedia(project.coverImage)}/>
                </article>

                <article className="col-span-3 text-sm">
                    <LinkLaunch url={project.url} text={project.url}/>
                    <p>{project.description}</p>
                    <div className={"pt-8 pb-4"}>
                        <dt className="text-color-secondary-700">Social</dt>
                        <StyledLink url={project.twitterId} text={project.twitterId}/>
                        <StyledLink url={project.discord_url} text={project.discord_url}/>
                        <StyledLink url={project.telegram_url} text={project.telegram_url}/>
                        <StyledLink url={project.medium_url} text={project.medium_url}/>
                    </div>

                    <div className={"pb-4"}>
                        <dt className="text-color-secondary-700">Technical</dt>
                        <StyledLink url={project.whitepaper_url} text={project.whitepaper_url}/>
                        <StyledLink url={project.githubRepo} text={project.githubRepo}/>
                        <StyledLink url={project.contract_url} text={project.contract_url}/>
                        <StyledLink url={project.docs_url} text={project.docs_url}/>
                    </div>

                </article>
            </article>
        </section>
    );
}
