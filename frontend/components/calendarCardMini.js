import Link from "next/link";

export function CalendarCardMini({item}) {

    return (
        <article className={"col-span-3"}>
            <div className="flex flex-col px-6 pt-6 pb-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10">

                <div className="flex flex-col gap-3 mt-auto">
                    <div className={"flex justify-between"}>
                        <Link href={{pathname: `/calendar-items/${item.slug}`}}>
                            <h2 className={"cursor-pointer text-color-secondary-700 fave-link py-0"}>{item.name}</h2>
                        </Link>
                    </div>
                    <div className={"text-sm"}>{item.dateAndTime}</div>
                    <div className={"text-sm"}>{item.description}</div>
                </div>
            </div>
        </article>
    );
}
