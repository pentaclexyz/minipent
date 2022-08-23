import ReactMarkdown from "react-markdown";
import {PersonCardMini} from "./personCardMini";

export default function PlanningCard({planning}) {
    return (
        <section className={"rounded-2xl bg-white/10 p-8"}>
            <article className={"grid grid-cols-12 gap-x-8 whitespace-pre-wrap"}>
                <article className="col-span-10">
                    <h1>{planning.name}</h1>
                    <ReactMarkdown>{planning.description}</ReactMarkdown>
                    <ReactMarkdown>{planning.content}</ReactMarkdown>
                </article>
                <article className="col-span-2">
                    {/*<h2 className={"pt-0"}>Team</h2>*/}
                    {planning.people.data.map((person, i) => (
                        <PersonCardMini person={person.attributes} key={i} />
                    ))}
                    </article>
            </article>
        </section>
    );
}
