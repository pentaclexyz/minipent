import React from "react";
import Link from "next/link";

function Card({ item }) {
  return (
    <article className="p-8 rounded-lg border border-gray-300">
      <h2>{item.name}</h2>
      <Link href={"/"}>
        <a>{item.description}</a>
      </Link>
    </article>
  );
}

export default Card;
