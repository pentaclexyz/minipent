import React from "react";
import ReactMarkdown from "react-markdown";
import BackLink from "./backLink";

const ResourceCard = ({item, ...props}) => {
    return (
        <div {...props}>
            <BackLink link={"/resources"} title={"Resources"}/>
            <h1>{item.name}</h1>
            <div className={"editorial mb-4 "}><ReactMarkdown>{item.description}</ReactMarkdown></div>
            <div className={"editorial"}><ReactMarkdown>{item.content}</ReactMarkdown></div>
        </div>
    );
};
export default ResourceCard;
