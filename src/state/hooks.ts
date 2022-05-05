/* eslint react-hooks/rules-of-hooks: "off" */
/* eslint no-unused-expressions: "off" */
import BigNumber from "bignumber.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRefresh from "hooks/useRefresh";
import {
  fetchFarmsPublicDataAsync,
  fetchFarmUserDataAsync,
  fetchMasonDataAsync,
  fetchMasonryPublicDataAsync,
  fetchTreasuryPublicDataAsync,
} from "./actions";
import { State, Farm, Masonry, Treasury } from "./types";
import { QuoteToken } from "../config/constants/types";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { fetchTreasuryUserDataAsync } from "./treasury";

const ZERO = new BigNumber(0);

export const useFetchPublicData = () => {
  const { account } = useWallet();
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync());
    dispatch(fetchMasonryPublicDataAsync());
    dispatch(fetchTreasuryPublicDataAsync());
    if (account) {
      dispatch(fetchFarmUserDataAsync(account));
      dispatch(fetchMasonDataAsync(account));
      dispatch(fetchTreasuryUserDataAsync(account));
    }
  }, [dispatch, slowRefresh, account]);
};

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) =>
    state.farms.data.filter((farm) => !farm.isHidden)
  );
  return farms;
};

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find((f) => f.pid === pid)
  );
  return farm;
};

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) =>
    state.farms.data.find((f) => f.lpSymbol === lpSymbol)
  );
  return farm;
};

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid);

  return {
    allowance: farm.userData
      ? new BigNumber(farm.userData.allowance)
      : new BigNumber(0),
    tokenBalance: farm.userData
      ? new BigNumber(farm.userData.tokenBalance)
      : new BigNumber(0),
    stakedBalance: farm.userData
      ? new BigNumber(farm.userData.stakedBalance)
      : new BigNumber(0),
    earnings: farm.userData
      ? new BigNumber(farm.userData.earnings)
      : new BigNumber(0),
    nextHarvestUntil: farm.userData ? farm.userData.nextHarvestUntil : 0,
  };
};

// Masonry

export const useMasonry = (): Masonry => {
  const masonry = useSelector((state: State) => state.masonry.data);
  return masonry;
};

// Treasury

export const useTreasury = (): Treasury => {
  const treasury = useSelector((state: State) => state.treasury.data);
  return treasury;
};

// Prices

// NATIVE TOKEN PRICE
export const usePriceBnbBusd = (): BigNumber => {
  const pid = 102; // BUSD-BNB LP
  const farm = useFarmFromPid(pid);
  return farm?.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
};

// RAV PRICE
export const usePriceRavBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  const bnbPriceUSD = usePriceBnbBusd(); // NATIVE PRICE
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 99; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);

  return farm?.tokenPriceVsQuote
    ? new BigNumber(farm.tokenPriceVsQuote).times(bnbPriceUSD)
    : ZERO;
};

// RAV PRICE
export const usePriceRshareBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  const bnbPriceUSD = usePriceBnbBusd(); // NATIVE PRICE
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 100; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);

  return farm?.tokenPriceVsQuote
    ? new BigNumber(farm.tokenPriceVsQuote).times(bnbPriceUSD)
    : ZERO;
};

// RAV PRICE
export const usePriceRbondBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  const ravPrice = usePriceRavBusd();
  const { bondPremiumRate } = useTreasury();
  const modifier = new BigNumber(bondPremiumRate).isGreaterThan(1e18)
    ? new BigNumber(bondPremiumRate).div(1e18)
    : new BigNumber(1);

  return ravPrice ? ravPrice.times(modifier) : ZERO;
};

export const usePriceRavNativeLP = (): number => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 0; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);

  const maticPrice = usePriceBnbBusd();
  const totalStakedMoney = maticPrice
    .times(farm?.lpTotalInQuoteToken ?? 0)
    .toNumber();
  const totalStakedLp = farm?.totalLpStaked ?? 1;

  return totalStakedMoney / totalStakedLp;
};

export const usePriceRshareNativeLP = (): number => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 1; // EGG-BUSD LP
  const farm = useFarmFromPid(pid);

  const maticPrice = usePriceBnbBusd();
  const totalStakedMoney = maticPrice
    .times(farm?.lpTotalInQuoteToken ?? 0)
    .toNumber();
  const totalStakedLp = farm?.totalLpStaked ?? 1;

  return totalStakedMoney / totalStakedLp;
};

/* export const usePriceRbondNativeLP = (): number => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 0 // EGG-BUSD LP
  const farm = useFarmFromPid(pid)

  const maticPrice = usePriceBnbBusd()
  const totalStakedMoney = maticPrice.times(farm?.lpTotalInQuoteToken ?? 0).toNumber()
  const totalStakedLp = farm?.totalLpStaked ?? 1

  return totalStakedMoney / totalStakedLp
} */

/* export const usePriceGpulGbntLP = (): number => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 2 // EGG-BUSD LP
  const farm = useFarmFromPid(pid)

  const GbntPrice = usePriceGbntBusd()
  const totalStakedMoney = GbntPrice.times(farm?.lpTotalInQuoteToken ?? 0).toNumber()
  const totalStakedLp = farm?.totalLpStaked ?? 1

  return totalStakedMoney / totalStakedLp
} */

export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const masonry = useMasonry();
  const bnbPrice = usePriceBnbBusd();
  const cakePrice = usePriceRavBusd();
  let value = new BigNumber(masonry.lpTotalInQuoteToken).times(bnbPrice);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i];
    if (farm.lpTotalInQuoteToken) {
      let val;
      if (
        farm.quoteTokenSymbol === QuoteToken.WFTM ||
        farm.quoteTokenSymbol === QuoteToken.ADA
      ) {
        val = bnbPrice.times(farm.lpTotalInQuoteToken);
      } else if (farm.quoteTokenSymbol === QuoteToken.RAV) {
        val = cakePrice.times(farm.lpTotalInQuoteToken);
      } else {
        val = farm.lpTotalInQuoteToken;
      }
      value = value.plus(val);
    }
  }
  return value;
};
