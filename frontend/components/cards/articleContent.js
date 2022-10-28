import React from "react";
import ReactMarkdown from "react-markdown";
import BackLink from "../nav/backLink";

const ArticleContent = ({item, section, ...props}) => {
    return (
        <div {...props}>
            <BackLink link={`/${section}`} section={section} title={section}/>
            <h1>{item.name}</h1>
            <p className={"text-sm"}>{item.date}</p>
            <div className={"editorial my-4"}><ReactMarkdown>{item.description}</ReactMarkdown></div>
            <div className={"editorial"}><ReactMarkdown>{item.content}</ReactMarkdown></div>
        </div>
    );
};
export default ArticleContent;
