/* eslint import/prefer-default-export: "off" */
import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchPlayerDataAsync } from "state/actions";
import { buyHunter } from "utils/callHelpers";
import { useHunterContract } from "./useContract";

export const useBuyPolygalacticHunter = () => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const gameContract = useHunterContract();

  const handleBuyHunter = useCallback(
    async (name: string) => {
      const txHash = await buyHunter(gameContract, account, name);
      dispatch(fetchPlayerDataAsync(account));
      return txHash;
    },
    [account, dispatch, gameContract]
  );

  return { onBuy: handleBuyHunter };
};
