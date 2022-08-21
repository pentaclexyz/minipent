import {useMemo} from "react";
import {AllowedLink} from "./allowedLink";
import ChainSearchResult from './search/chainSearchResult';

function SearchResult({result, group, slug, price}) {
    const description = useMemo(
        () =>
            result?.attributes?.description && (
                <>
                    <div className="my-2 text-s line-clamp-2">
                        {result?.attributes?.description?.slice(0, 100)}
                        {result?.attributes?.description?.length > 100 && "..."}
                    </div>
                </>
            ),
        [result?.attributes?.description]
    );

    const shortenedTitle = useMemo(() => {
        const title = result?.attributes?.name || result?.attributes?.title;
        if (title.length > 30) {
            return `${title?.slice(0, 27)}...`;
        } else {
            return title;
        }
    }, [result?.attributes?.name, result?.attributes?.title]);

    return (
        <AllowedLink group={group} slug={slug}>
            <div className="w-full search-result internal-link hover:bg-white/10">
                <h4>{shortenedTitle}</h4>
                {description}
            </div>
        </AllowedLink>
    );
}

export default SearchResult;
