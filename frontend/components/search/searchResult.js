import {useMemo} from "react";
import {AllowedLink} from "../nav/allowedLink";

function SearchResult({result, group, slug}) {
    const description = useMemo(
        () =>
            result?.attributes?.description && (
                <div className="line-clamp-2">
                    {result?.attributes?.description?.slice(0, 100)}
                    {result?.attributes?.description?.length > 100 && "..."}
                </div>
            ),
        [result?.attributes?.description]
    );

    const shortenedTitle = useMemo(() => {
        const title = result?.attributes?.name || result?.attributes?.title;
        if (title.length > 60) {
            return `${title?.slice(0, 27)}...`;
        } else {
            return title;
        }
    }, [result?.attributes?.name, result?.attributes?.title]);

    return (
        <AllowedLink group={group} slug={slug}>
            <div className="internal-link">
                <h3>{shortenedTitle}</h3>
                <div>{description}</div>
            </div>
        </AllowedLink>
    );
}

export default SearchResult;
