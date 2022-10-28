import ProjectCardSummary from "./cards/projectCardSummary";

export default function Projects({projects}) {
    return (
        <div>
            {projects?.map((project, i) => (
                <div key={i}>
                    <ProjectCardSummary project={project.attributes} id={project.id}/>
                </div>
            ))}
        </div>
    );
}
