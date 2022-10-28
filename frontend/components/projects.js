import ArticleCard from "./cards/articleCard";

export default function Projects({projects}) {
    return (
        <div>
            {projects?.map((project, i) => (
                <div key={i}>
                    <ArticleCard project={project.attributes} section={"projects"} id={project.id}/>
                </div>
            ))}
        </div>
    );
}
