import { createContext, useContext, useState } from "react";
import qs from "qs";

const CoingeckoContext = createContext({
  prices: {},
  /**
   * @param {Array<string>} items 
   */
  loadPrices: items => {}
});

export const useCoingecko = () => useContext(CoingeckoContext);

export function CoingeckoProvider({ ...props }) {
  const [prices, setPrices] = useState({});

  /**
   * @param {Array<string>} tickers
   */
  const loadPrices = async (tickers) => {
    const now = Date.now();
    const relevant = tickers.filter((coingecko_id) => {
      return (
        !prices[coingecko_id] || now - 300000 < prices[coingecko_id]?.timestamp
      );
    });
    if (!relevant.length) {
      return;
    }
    const query = qs.stringify({
      ids: relevant.join(","),
      vs_currencies: "usd",
    });
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?${query}`
    ).then((res) => res.json());
    const newObj = { ...prices };
    Object.entries(res).forEach(([key, value]) => {
      newObj[key] = { ...value, timestamp: Date.now() };
    });
    setPrices({ ...prices, ...newObj });
  };

  return (
    <CoingeckoContext.Provider value={{ prices, loadPrices }} {...{ props }}>
      {props.children}
    </CoingeckoContext.Provider>
  );
}
