export function PersonCardMini({person}) {
    return (
        <article className={"col-span-4"}>
            <div className="flex flex-col px-6 pt-6 pb-3 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10">
                <div className="flex flex-col gap-3 mt-auto">
                    <div className={"text-sm"}>{person.name}</div>
                    <div className={"text-sm"}>{person.bio}</div>
                    <div className={"text-sm"}>@{person.twitter}</div>
                </div>
            </div>
        </article>
    );
}
