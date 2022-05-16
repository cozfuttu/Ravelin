import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchPlayerDataAsync } from "state/actions";
import { startMission } from "utils/callHelpers";
import { useHunterContract } from "./useContract";

// Start a Mission at Bounty Hunter Contract
const useStartPolygalacticHunterMission = (
  tokenId: number,
  missionId: number
) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const gameContract = useHunterContract();

  const handleStartMission = useCallback(async () => {
    try {
      const tx = await startMission(gameContract, tokenId, missionId, account);
      dispatch(fetchPlayerDataAsync(account));
      return tx?.events?.SendHunter?.returnValues?.missionId;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, tokenId, missionId, gameContract]);

  return { onStart: handleStartMission };
};

export default useStartPolygalacticHunterMission;
