import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BackLink from "./backLink";

const ArticleCard = ({item, ...props}) => {
    return (
        <div {...props}>
            <BackLink link={"/articles"} title={"Articles"}/>
            <h1>{item.name}</h1>
            <div className={"editorial"}>
                <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
        </div>
    );
};
export default ArticleCard;
