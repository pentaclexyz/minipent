import {getStrapiImageURL} from "./api";

export function getStrapiMedia(media) {
  const { url } = media?.data?.attributes || {};
  const imageUrl = url?.startsWith("/") ? getStrapiImageURL(url) : url;
  return imageUrl;
}