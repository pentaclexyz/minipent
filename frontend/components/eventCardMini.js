import Link from "next/link";

function removeTrailingSlash(str = '') {
    return str.replace(/\/+$/, '');
}

export function EventCardMini({event}) {

    return (
        <event className={"col-span-4"}>
            <div className="flex flex-col px-6 pt-6 pb-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10">

                <div className="flex flex-col gap-3 mt-auto">
                    <Link href={{pathname: `/events/${event.slug}`}}>
                        <h2 className={"cursor-pointer text-color-secondary-700 fave-link py-0"}>{event.name}</h2>
                    </Link>

                    <p className={"text-sm"}>{event.start} - {event.end}</p>
                    <p className={"text-sm"}>{event.description}</p>
                    <div>
                        <a href={event.url} rel="nofollow noreferrer noopener" target={"_blank"}
                           className={"line-clamp-2"}>
                            <p className={"text-sm cursor-pointer hover:text-color-secondary-700 line-clamp-1 external-link"}>
                                {removeTrailingSlash(event.url?.split("//")[1])}
                            </p>
                        </a>
                        {event.twitter && (
                            <a href={`https://www.twitter.com/${event.twitter}`} rel="nofollow noreferrer noopener"
                               target={"_blank"}
                               className={"line-clamp-2"}>
                                <p className={"text-sm cursor-pointer hover:text-color-secondary-700 line-clamp-1 external-link"}>
                                    @{event.twitter}
                                </p>
                            </a>)}
                    </div>
                </div>
            </div>
        </event>
    );
}
