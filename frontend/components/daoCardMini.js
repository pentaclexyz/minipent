import React from "react";
import Link from "next/link";
import {PersonCardTiny} from "./personCardTiny";
import {getStrapiMedia} from "../lib/media";
import Image from "next/image";

export function DaoCardMini({dao}) {

    return (
        <article className={"col-span-3"}>
            <div className="p-card-inner">

                <div className="flex flex-col gap-3">
                    <Link href={{pathname: `/daos/${dao.slug}`}}>
                        <div className={"cursor-pointer"}>
                            <h2 className={"txt-secondary internal-link"}>{dao.name}</h2>
                        </div>
                    </Link>
                    <div className={"text-sm"}>{dao.description}</div>
                    <div className={"text-sm"}>{dao.content}</div>
                </div>

            </div>
        </article>
    );
}
