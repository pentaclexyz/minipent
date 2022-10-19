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

const API_ENDPOINTS = ["projects", "news", "contributors", "articles", "events"];

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
    const container = document.querySelector(".search-container");
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
    <div className={`search-container bg-bg-01 relative mb-4 ${focussed ? "border border-border-tertiary" : ""}`}>
      <div className="absolute left-4 top-5">
        <SearchIcon width={20}/>
      </div>
      <Combobox onChange={() => {}}>
        <Combobox.Input className={`search-input border-b border-border-tertiary`} type={"search"} onFocus={handleFocus} onChange={handleSubmit} ref={ref}/>
        {focussed && (
          <Combobox.Options static className={`grid grid-cols-12 sm:gap-x-12 lg:gap-x-20 gap-y-8 px-6 pb-6 mt-0 text-sm`}>
            {!!loading && !filteredResults.length && (
              <div key={"loading"} className="flex col-span-12 justify-center items-center">
                <SearchLoading/>
              </div>
            )}
            {query && !loading && !filteredResults.length && <NoResults/>}
            {filteredResults.map((group, i) => (
              <div className="contents" key={i}>
                <div className="col-span-12">
                  <h2 className={"pt-4 pb-0 capitalize font-bold"} id={`header-${group.name}`}>{group.name}</h2>
                </div>
                {group.data.map((result, i) => (
                  <ul className="col-span-12 sm:col-span-6 md:col-span-3" key={i}>
                    <Combobox.Option
                      value={{...result.attributes, id: result.id, type: group.name,}}>
                      <SearchResult result={result} group={group.name} slug={result.attributes.slug}/>
                    </Combobox.Option>
                  </ul>
                ))}
                {group.meta.pagination.total >
                  group.meta.pagination.pageSize && (
                    <div className="col-span-12">
                      <AllowedLink group={group.name} slug={""}>
                        <span className="inline-block mx-3 ml-auto text-xs cursor-pointer">
                          {group.meta.pagination.total - group.meta.pagination.pageSize}{" "} more
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
