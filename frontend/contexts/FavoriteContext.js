import { createContext, useState } from "react";
import { useSignMessage, useAccount } from "wagmi";
import { useEffect, useContext } from "react";
import { fetchAPI } from "../lib/api";
import { ethers } from "ethers";

const FavoriteContext = createContext({
  faves: {},
  addFave: (item) => {},
  removeFave: (item) => {},
});

export const useFavorites = () => useContext(FavoriteContext);

export function FavoriteContextProvider({ ...props }) {
  const { data, signMessage } = useSignMessage({
    message: "Connect your wallet to save items to your favourites",
  });
  const onDisconnect = () => {
    localStorage.removeItem("login-signature");
  };
  const onConnect = () => {
    if (!localStorage.getItem("login-signature")) {
      signMessage();
    }
  };
  const { address } = useAccount({ onConnect, onDisconnect });
  const [faves, setFaves] = useState({});
  const [cachedSig, setCachedSig] = useState();

  useEffect(() => {
    const previousSig = localStorage.getItem("login-signature");
    if (address && previousSig) {
      const signatureOwner = ethers.utils.verifyMessage(
        "Connect your wallet to save items to your favourites",
        previousSig
      );
      if (signatureOwner === address) {
        setCachedSig(previousSig);
      }
    }
  }, [address]);

  useEffect(() => {
    if (cachedSig) {
      const params = new URLSearchParams();
      params.append("owner", address);
      params.append("signature", cachedSig);
      fetchAPI(`/fave/getByOwner?${params.toString()}`).then((res) => {
        if (res.success === false) {
          alert("Signature failed");
          return;
        }
        const _faves = { ...faves };
        res.forEach((item) => {
          faves[item.item_id] = item;
        });
        setFaves(_faves);
      });
    }
  }, [cachedSig]);

  useEffect(() => {
    const eitherSig = data || cachedSig;
    if (eitherSig && address) {
      const params = new URLSearchParams();
      params.append("owner", address);
      params.append("signature", eitherSig);
      fetchAPI(`/fave/getByOwner?${params.toString()}`).then((res) => {
        if (res.success === false) {
          alert("Signature failed");
          return;
        }
        localStorage.setItem("login-signature", eitherSig);
        const _faves = { ...faves };
        res.forEach((item) => {
          faves[item.item_id] = item;
        });
        setFaves(_faves);
      });
    }
  }, [data, address, cachedSig]);

  const addFave = (key) => {
    const tmp = { ...faves };
    tmp[key] = true;
    setFaves({ ...tmp });
  };
  const removeFave = (key) => {
    const tmp = { ...faves };
    delete tmp[key];
    setFaves({ ...tmp });
  };

  return (
    <FavoriteContext.Provider
      value={{ faves, addFave, removeFave }}
      {...{ props }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
}
