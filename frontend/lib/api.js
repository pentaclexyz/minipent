import qs from "qs";

/**
 * @typedef  {'$ne'|'$lt'|'$lte'|'$gt'|'$gte'|'$in'|'$notIn'|'$contains'|'$notContains'|'$containsi'|'$notContainsi'|'$null'|'$notNull'|'$between'|'$startsWith'|'$endsWith'} SearchOperator
 * @typedef  {'$and'|'$or'} JoinOperator
 */

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}

export const getSlugsForPath = async (path) => {
    let slugs = [];
    const defaultOpts = {
        fields: ["slug"],
        pagination: {pageSize: 500},
    };
    let currentPage = 1;
    let projectsRes = await fetchAPI(`/${path}`, defaultOpts);
    let currentPagination = projectsRes.meta.pagination;
    currentPage = currentPagination.page;
    slugs = [...slugs, ...projectsRes.data];
    while (currentPage < currentPagination.pageCount) {
        projectsRes = await fetchAPI(`/${path}`, defaultOpts);
        currentPagination = projectsRes.meta.pagination;
        currentPage = currentPagination.page;
        slugs = [...slugs, ...projectsRes.data];
    }
    return slugs
        .filter((project) => project.attributes.slug)
        .map((project) => ({
            params: {
                slug: project?.attributes?.slug,
            },
        }));
};

const searchResultOptions = {
    pagination: {page: 1, pageSize: 16, withCount: true},
    sort: ["name"],
};

/**
 * for each api category we create a fetch with a filter
 * @param {String} type
 * @param {String} searchString
 * @returns {Object} the query object
 */
export const getSearchFilterProps = (type, searchString) => {
    /**
     * @param {SearchOperator} searchOperator
     * @returns {{[SearchOperator]: string}>}
     */
    const containsSearchQuery = (searchOperator) => ({
        [searchOperator]: searchString,
    });
    /**
     * @param {Array<String>} properties
     * @param {JoinOperator} join
     * @param {SearchOperator} operator
     */
    const getFilterForProps = (
        properties,
        join = "$or",
        operator = "$containsi"
    ) => ({
        filters: {
            [join]: properties.map((property) => ({
                [property]: containsSearchQuery(operator),
            })),
        },
    });
};

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns {Object} Parsed API call response
 */
export async function fetchAPI(
    path,
    urlParamsObject = {},
    options = {},
    asJson = true
) {
    // Merge default and user options
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {encodeValuesOnly: true});
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    console.log(`requesting: ${requestUrl}`);
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occurred please try again`);
    }
    if (asJson) {
        return await response.json();
    }
    return response;
}
