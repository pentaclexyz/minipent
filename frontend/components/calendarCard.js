import ReactMarkdown from "react-markdown";
import {PersonCardMini} from "./personCardMini";
import {TasksCard} from "./tasksCard";
import BackLink from "./backLink";

export default function CalendarCard({calendar}) {
    return (
        <section className={"rounded-2xl bg-white/10 p-2 md:p-8 md:grid md:grid-cols-12 md:gap-x-8"}>

            <article className="md:col-span-10">
                <BackLink link={"/calendar"} title={"Planning"}/>
                <h1>{calendar.name}</h1>
                <article className={"py-4 editorial"}><ReactMarkdown>{calendar.description}</ReactMarkdown></article>
                <TasksCard tasks={calendar.tasks} />
                <article className={"pt-2 editorial"}><ReactMarkdown>{calendar.content}</ReactMarkdown></article>
            </article>

            <article className="pt-6 md:col-span-2">
                {calendar.people.data.map((person, i) => (
                    <PersonCardMini person={person.attributes} key={i}/>
                ))}
            </article>

        </section>
    );
}
