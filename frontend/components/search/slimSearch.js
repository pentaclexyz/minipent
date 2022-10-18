import { AllowedLink } from "../allowedLink";
import React, { useState, useRef, useCallback } from "react";
import debounce from "debounce";
import { fetchAPI, getSearchFilterProps } from "../../lib/api";
import useOnClickOutside from "../../hooks/use-click-outside";
import { SearchIcon } from "@heroicons/react/outline";
const API_ENDPOINTS = ["sections", "categories", "tags", "chains", "projects"];

function SlimSearch() {
  const [focussed, setFocussed] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [, setLoading] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (e) => {
    const container = document.querySelector(".search-result-list");
    if (container?.contains(e.target)) {
      return;
    }
    setResults([]);
  });

  /**
   * @param {object} param
   * @param {string} param.search
   */
  const onSubmit = useCallback(async ({ search }) => {
    if (search === "") {
      return;
    }
    setQuery(search);
    setLoading(true);

    const apiPromises = API_ENDPOINTS.map((name) =>
      fetchAPI(`/${name}`, getSearchFilterProps(name, search))
        .catch(() => ({ data: [], name }))
        // add category name for display purposes
        .then((res) => ({ ...res, name }))
    );

    const allFetchedResults = await Promise.allSettled(apiPromises);
    const values = allFetchedResults
      .filter((r) => r.status === "fulfilled" && r.value.data.length)
      .map((r) => r.value);

    const flattened = values
      .map((value) =>
        value.data.map((data) => ({ ...data, group: value.name }))
      )
      .flat();

    setResults(flattened);
    setLoading(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (!focussed) {
      setFocussed(true);
    }
    if (!query) {
      onSubmit({ search: "" });
    } else {
      onSubmit({ search: query });
    }
  }, [query, focussed, onSubmit]);

  const handleSubmit = debounce(
    (event) => onSubmit({ search: event.target.value }),
    200
  );

  return (
    <>
      <div className="search-container w-full">
        <div className="absolute left-4 top-4">
          <SearchIcon width={20} />
        </div>
        <input className={`pl-12 search-input`} type={"search"} onFocus={handleFocus} onChange={handleSubmit} ref={ref}/>
      </div>
      {!!results.length && (
        <div className="relative z-50">
          <ul className="search-result-list -mt-2">
            {results.map((result) => (
              <li key={`${result.group}-${result.attributes.slug}`} className="cursor-pointer bg-black">
                <AllowedLink group={result.group} slug={result.attributes.slug}>
                  <div className="px-3 py-2 text-sm flex justify-between items-center bg-tertiary hover:bg-black">
                    <span>
                      {result.attributes.name || result.attributes.title}
                    </span>
                    <span>
                      {result.group}
                    </span>
                  </div>
                </AllowedLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SlimSearch;
