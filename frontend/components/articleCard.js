import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ArticleCard = ({item, ...props}) => {
    return (
        <div {...props}>
            <h1>{item.name}</h1>
            <div className={"whitespace-pre-wrap"}>
                <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
        </div>
    );
};
export default ArticleCard;
