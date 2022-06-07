import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchPlayerDataAsync } from "state/actions";
import { revealMission } from "utils/callHelpers";
import { useHunterContract } from "./useContract";

// Reveal a Mission result at Polygalactic Hunter Contract
const useRevealMission = () => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const gameContract = useHunterContract();

  const handleRevealMission = useCallback(async () => {
    const tx = await revealMission(gameContract, account);
    console.log('revealed mission: ', tx)
    dispatch(fetchPlayerDataAsync(account));
    return tx?.events?.MissionCompleted?.returnValues?.result;
  }, [account, dispatch, gameContract]);

  return { onReveal: handleRevealMission };
};

export default useRevealMission;
