import ReactMarkdown from "react-markdown";
import BackLink from "./backLink";

export default function NewsCard({news}) {
    return (
        <section className={""}>

            <article className="md:col-span-10">
                <BackLink link={"/news"} title={"News"}/>
                <h1>{news.name}</h1>
                <article className={"py-4"}><ReactMarkdown>{news.description}</ReactMarkdown></article>
                <article className={"pt-2"}><ReactMarkdown>{news.content}</ReactMarkdown></article>
            </article>

            <article className="pt-6 md:col-span-2">
                {/*{news.people.data.map((person, i) => (*/}
                {/*    <PersonCardMini person={person.attributes} key={i}/>*/}
                {/*))}*/}
            </article>

        </section>
    );
}
