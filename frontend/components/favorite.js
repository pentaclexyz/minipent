import HeartIconOutline from "@heroicons/react/outline/HeartIcon";
import HeartIconSolid from "@heroicons/react/solid/HeartIcon";
import { useSignMessage, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { fetchAPI } from "../lib/api";

export const IsFavorite = ({ id, callback }) => {
  const [itemId, setItemId] = useState();
  const { signMessage, data } = useSignMessage();
  const { address } = useAccount();
  useEffect(() => {
    if (data && itemId) {
      const params = new URLSearchParams();
      params.append("owner", address);
      params.append("item_id", itemId);
      params.append("signature", data);
      fetchAPI(`/fave/removeFave?${params.toString()}`);
      if (callback) {
        callback(itemId);
      }
    }
  }, [data, itemId]);
  return (
    <HeartIconSolid
      width={24}
      height={24}
      onClick={() => {
        setItemId(`project:${id}`);
        signMessage({ message: `Remove favourite :${id}` });
      }}
    />
  );
};
export const IsNotFavorite = ({ id, callback }) => {
  const [itemId, setItemId] = useState();
  const { signMessage, data } = useSignMessage();
  const { address } = useAccount();
  useEffect(() => {
    if (data && itemId) {
      const params = new URLSearchParams();
      params.append("owner", address);
      params.append("item_id", itemId);
      params.append("signature", data);
      fetchAPI(`/fave/addFave?${params.toString()}`);
      if (callback) {
        callback(itemId);
      }
    }
  }, [data, itemId]);
  return (
    <HeartIconOutline
      width={24}
      height={24}
      onClick={() => {
        setItemId(`project:${id}`);
        signMessage({ message: `Add favourite :${id}` });
      }}
    />
  );
};
