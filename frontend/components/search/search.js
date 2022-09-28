import {useCallback, useState, useRef, useMemo, useEffect} from "react";
import {Combobox} from "@headlessui/react";
import debounce from "debounce";

import useOnClickOutside from "../../hooks/use-click-outside";
import {fetchAPI, getSearchFilterProps} from "../../lib/api";
import SearchResult from "../searchResult";
import NoResults from "./no-results";
import SearchLoading from "./search-loading";
import scrollParentToChild from "../../lib/scroll-parent-to-child";
import {AllowedLink} from "../allowedLink";
import {SearchIcon} from "@heroicons/react/outline";

const API_ENDPOINTS = ["contributors", "news", "articles"];

export default function Search({initialValues}) {
  const [focussed, setFocussed] = useState(false);
  const [filteredResults, setFilteredResults] = useState(initialValues);
  const [allResults, setAllResults] = useState(initialValues);
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const ref = useRef();
  const reset = () => {
    setFocussed(false);
    setFilteredResults([]);
    setSelectedType("");
  };

  useEffect(() => {
    (async () => {
      const relevantItems = filteredResults
        .map((res) => res.data)
        .flat()
        .filter((res) => res.attributes.coingecko_id);
      if (relevantItems.length) {
        const idsString = relevantItems.map((res) =>
          match(res?.attributes?.coingecko_id)
        );
      }
    })();
  }, [filteredResults]); // eslint-disable-line react-hooks/exhaustive-deps

  useOnClickOutside(ref, (e) => {
    const container = document.querySelector(".search-input-container");
    if (container.contains(e.target)) {
      return;
    }
    reset();
  });
  /**
   * @param {object} param
   * @param {string} param.search
   */

  useEffect(() => {
    (async () => {
      const apiPromises = API_ENDPOINTS.map((name) =>
        fetchAPI(`/${name}`, getSearchFilterProps(name, ""))
          .catch(() => ({data: [], name}))
          .then((res) => ({...res, name}))
      );

      const allFetchedResults = await Promise.allSettled(apiPromises);
      const values = allFetchedResults
        .filter((r) => r.status === "fulfilled" && r.value.data.length)
        .map((r) => r.value);
      setAllResults(values);
    })();
  }, []);

  const onSubmit = useCallback(
    async ({search}) => {
      if (search === previousQuery && search !== "") {
        return;
      }
      setPreviousQuery(query);
      setQuery(search);
      setLoading(true);

      const filteredApiPromises = API_ENDPOINTS.map((name, i) =>
        fetchAPI(`/${name}`, getSearchFilterProps(name, search))
          .catch(() => ({data: [], name}))
          .then((res) => ({...res, name}))
      );

      const filteredResults = await Promise.allSettled(filteredApiPromises);
      const filteredValues = filteredResults
        .filter((r) => r.status === "fulfilled" && r.value.data.length)
        .map((r) => r.value);

      setFilteredResults(filteredValues);
      setLoading(false);
    },
    [query, previousQuery]
  );

  useEffect(() => {
    (async () => {
      const apiPromises = API_ENDPOINTS.map((name) =>
        fetchAPI(`/${name}`, getSearchFilterProps(name, ""))
          .catch(() => ({data: [], name}))
          // add category name for display purposes
          .then((res) => ({...res, name}))
      );

      const allFetchedResults = await Promise.allSettled(apiPromises);
      const values = allFetchedResults
        .filter((r) => r.status === "fulfilled" && r.value.data.length)
        .map((r) => r.value);

      setFilteredResults(values);
    })();
  }, []);

  const handleFocus = useCallback(() => {
    if (!focussed) {
      setFocussed(true);
    }
    if (!query) {
      onSubmit({search: ""});
    } else {
      onSubmit({search: query});
    }
  }, [query, focussed, onSubmit]);

  const handleSubmit = debounce(
    (event) => onSubmit({search: event.target.value}),
    200
  );

  /**
   * @param {Event} e
   * @param {string} name
   */
  const handleClickType = (e, name) => {
    e.stopPropagation();
    if (name === selectedType) {
      setSelectedType("");
    } else {
      try {
        scrollParentToChild(
          document.querySelector(".search-input-option"),
          document.querySelector(`#header-${name}`)
        );
        setSelectedType(name);
      } catch (e) {
        console.error(e);
        reset();
      }
    }
  };

  const typeHeaderData = useMemo(
    () => filteredResults.map((res) => ({name: res.name, size: res.data.length})),
    [filteredResults]
  );

  const totalSize = useMemo(
    () =>
      allResults.reduce((total, group) => total + group.meta.pagination.total, 0),
    [allResults]
  );
  const filteredSize = useMemo(
    () =>
      filteredResults.reduce((total, group) => total + group.meta.pagination.total, 0),
    [filteredResults]
  );


  return (
    <div className={`search-input-container relative ${focussed ? "border-2 border-color-tertiary-700" : ""}`}>
      <div className="absolute left-4 top-4">
        <SearchIcon width={20}/>
      </div>
      <Combobox onChange={() => {
      }}>
        <Combobox.Input
          className={`search-input`}
          type={"search"}
          onFocus={handleFocus}
          onChange={handleSubmit}
          ref={ref}
          style={{outline: "none"}}
        />
        {focussed && (
          <Combobox.Options static className={`px-3 py-2 mt-0 search-input-option search-result-grid`}>
            {!!loading && !filteredResults.length && (
              <div key={"loading"} className="flex col-span-12 justify-center items-center">
                <SearchLoading/>
              </div>
            )}
            {query && !loading && !filteredResults.length && <NoResults/>}
            {/* Grouping search results by their endpoint names ('tags', 'categories', 'projects'....) */}
            {filteredResults.map((group, i) => (
              <div className="contents" key={i}>
                <div className="col-span-12">
                  <h4 id={`header-${group.name}`} className="px-1 search-group-header">{group.name}</h4>
                </div>
                {group.data.map((result) => (
                  <div className="contents" key={result.attributes.id}>
                    <Combobox.Option
                      className={`flex col-span-12 rounded-md select-none sm:col-span-6 md:col-span-4 lg:col-span-3`}
                      value={{...result.attributes, id: result.id, type: group.name,}}>
                      <SearchResult result={result} group={group.name} slug={result.attributes.slug}/>
                    </Combobox.Option>
                  </div>
                ))}
                {group.meta.pagination.total >
                  group.meta.pagination.pageSize && (
                    <div className="flex col-span-12 w-full">
                      <AllowedLink group={group.name} slug={""}>
                        <span className="inline-block mx-3 ml-auto text-xs cursor-pointer hover:text-color-primary-700">... and{" "}
                          {group.meta.pagination.total -
                            group.meta.pagination.pageSize}{" "}
                          more
                        </span>
                      </AllowedLink>
                    </div>
                  )}
              </div>
            ))}
          </Combobox.Options>
        )}
      </Combobox>

      <div className="hidden">
        {filteredSize} out of {totalSize} results
      </div>
    </div>
  );
}
