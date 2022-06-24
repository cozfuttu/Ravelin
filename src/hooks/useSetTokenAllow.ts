/* eslint import/prefer-default-export: "off" */
import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchMissionDataAsync } from "state/actions";
import { setTokenAllow } from "utils/callHelpers";
import { useHunterContract } from "./useContract";
import BigNumber from "bignumber.js";

export const useSetTokenAllow = () => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const gameContract = useHunterContract();

  const handleSetTokenAllow = useCallback(
    async (
      _token1: string,
      _token2: string,
      _cooldown: string,
      _token1And2: boolean
    ) => {
      const txHash = await setTokenAllow(
        gameContract,
        _token1,
        _token2,
        _cooldown,
        _token1And2,
        account
      );
      dispatch(fetchMissionDataAsync());
      return txHash;
    },
    [account, dispatch, gameContract]
  );

  return { onSetTokenAllow: handleSetTokenAllow };
};
