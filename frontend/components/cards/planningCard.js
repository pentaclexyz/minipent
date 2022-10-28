import ReactMarkdown from "react-markdown";
import {PersonCardMini} from "../cardsMini/personCardMini";
import {TasksCard} from "./tasksCard";
import BackLink from "../nav/backLink";

export default function PlanningCard({planning}) {
    return (
        <section className={"md:grid md:grid-cols-12 md:gap-x-8"}>

            <article className="md:col-span-10">
                <BackLink link={"/planning"} title={"Planning"}/>
                <h1>{planning.name}</h1>
                <article className={"py-4 editorial"}><ReactMarkdown>{planning.description}</ReactMarkdown></article>
                <article className={"pt-2 editorial"}><ReactMarkdown>{planning.content}</ReactMarkdown></article>
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
