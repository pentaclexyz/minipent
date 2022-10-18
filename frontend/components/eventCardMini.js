import Link from "next/link";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function EventCardMini({item}) {

    return (
        <article className={"col-span-4"}>
            <div className="flex flex-col p-card-inner">

                <div className="flex flex-col gap-3 mt-auto">
                    <Link href={{pathname: `/events/${item.slug}`}}>
                        <h2 className={"cursor-pointer txt-secondary internal-link py-0"}>{item.name}</h2>
                    </Link>

                    <p className={"text-sm"}>{item.start} - {item.end}</p>
                    <p className={"text-sm"}>{item.description}</p>
                    <div>
                        <a href={item.url} rel="nofollow noreferrer noopener" target={"_blank"}
                           className={"line-clamp-2"}>
                            <p className={"text-sm cursor-pointer hover:txt-secondary line-clamp-1 external-link"}>
                                {removeTrailingSlash(item.url?.split("//")[1])}
                            </p>
                        </a>
                        {item.twitter && (
                            <a href={`https://www.twitter.com/${item.twitter}`} rel="nofollow noreferrer noopener"
                               target={"_blank"}
                               className={"line-clamp-2"}>
                                <p className={"text-sm cursor-pointer hover:txt-secondary line-clamp-1 external-link"}>
                                    @{item.twitter}
                                </p>
                            </a>)}
                    </div>
                </div>
            </div>
        </article>
    );
}
