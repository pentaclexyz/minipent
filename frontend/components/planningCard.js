import ReactMarkdown from "react-markdown";
import {PersonCardMini} from "./personCardMini";
import {TasksCard} from "./tasksCard";
import BackLink from "./backLink";

export default function PlanningCard({planning}) {
    return (
        <section className={"rounded-2xl bg-white/10 p-8 md:grid md:grid-cols-12 md:gap-x-8"}>

            <article className="md:col-span-10">
                <BackLink link={"/planning"} title={"Planning"}/>
                <h1>{planning.name}</h1>
                <article className={"pt-2"}><ReactMarkdown>{planning.description}</ReactMarkdown></article>
                <article className={"pt-2"}><ReactMarkdown>{planning.content}</ReactMarkdown></article>
               <TasksCard tasks={planning.tasks} />
            </article>

            <article className="pt-6 md:col-span-2">
                {planning.people.data.map((person, i) => (
                    <PersonCardMini person={person.attributes} key={i}/>
                ))}
            </article>

        </section>
    );
}
