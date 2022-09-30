import React from "react";
import ReactMarkdown from "react-markdown";
import BackLink from "./backLink";

const ArticleCard = ({item, ...props}) => {
    return (
        <div {...props}>
            <BackLink link={"/articles"} title={"Articles"}/>
            <h1>{item.name}</h1>
            <div className={"editorial mb-4 "}><ReactMarkdown>{item.description}</ReactMarkdown></div>
            <div className={"editorial"}><ReactMarkdown>{item.content}</ReactMarkdown></div>
        </div>
    );
};
export default ArticleCard;
