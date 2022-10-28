import ReactMarkdown from "react-markdown";
import BackLink from "../nav/backLink";
import {PersonCardMini} from "../mini/personCardMini";

export default function EventCard({event}) {
    return (
        <section className={""}>

            <article className="md:col-span-10">
                <BackLink link={"/events"} title={"Events"}/>
                <h1>{event.name}</h1>
                <article className={"pb-6 editorial"}>
                    <ReactMarkdown>{event.details}</ReactMarkdown>
                </article>
                <article className={"pb-6 editorial"}>
                    <ReactMarkdown>{event.planning}</ReactMarkdown>
                </article>
            </article>

            <article className="pt-6 md:col-span-2">
                {event.people.data.map((person, i) => (
                    <PersonCardMini person={person.attributes} key={i}/>
                ))}
            </article>

        </section>
    );
}
