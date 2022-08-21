import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";

function TabNav({tabs, section}) {
  const {query, push} = useRouter();

  return (
    <>
      <div className="sm:hidden">
        {/*<h1 className={"pb-2"}>{section}</h1>*/}
        <label htmlFor="tabs" className="sr-only">Select a category</label>
        <select
          id="tabs"
          name="tabs"
          className="text-color-black p-2 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={"all"}
          onChange={(e) => {
            push({
              pathname: `/section/${section}`,
              query: {category: e.target.value},
            });
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex flex-wrap gap-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link key={tab.name} passHref href={tab.href}
                  aria-current={query.category === tab.name ? "page" : undefined}>
              <a className={`${(query.category === tab.name || (!query.category && tab.name === "all")
                ? "bg-white/20 text-grey-1000"
                : "hover:text-color-primary-700 first-letter:") +
              " hover:text-color-primary-700 px-2 py-1.5 text-sm rounded-md cursor-pointer"
              }`}>{tab.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default TabNav;
