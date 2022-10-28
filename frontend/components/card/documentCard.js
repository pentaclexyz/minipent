import React from "react";
import ReactMarkdown from "react-markdown";
import BackLink from "../nav/backLink";

const DocumentCard = ({item, ...props}) => {
    return (
        <div {...props}>
            <BackLink link={"/documents"} title={"Docs"}/>
            <h1>{item.name}</h1>
            <div className={"editorial mb-4 "}><ReactMarkdown>{item.description}</ReactMarkdown></div>
            <div className={"editorial"}><ReactMarkdown>{item.content}</ReactMarkdown></div>
        </div>
    );
};
export default DocumentCard;
