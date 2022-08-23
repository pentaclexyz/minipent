import ReactMarkdown from "react-markdown";
import {PersonCardMini} from "./personCardMini";

export default function PlanningCard({planning}) {
    return (
        <section className={"rounded-2xl bg-white/10 p-8"}>
            <h1>{planning.name}</h1>

            <article className={"grid grid-cols-12 gap-x-8 whitespace-pre-wrap"}>
                <article className="col-span-9">
                    <ReactMarkdown>{planning.description}</ReactMarkdown>
                    <ReactMarkdown>{planning.content}</ReactMarkdown>
                </article>
                <article className="col-span-3">
                    <h2>who</h2>
                    {planning.people.data.map((person, i) => (
                        <PersonCardMini person={person.attributes} key={i} />
                    ))}
                    </article>
            </article>
        </section>
    );
}
