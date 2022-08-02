import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import { fetchInterstellarsPublicDataAsync } from "state/actions";
import { adjustInterstellarBlockEnd } from "utils/callHelpers";
import { useInterstellarContract } from "./useContract";

const useAdjustBlockEnd = (contractAddress: string) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const interstellarContract = useInterstellarContract(contractAddress);

  const handleAdjust = useCallback(async () => {
    const txHash = await adjustInterstellarBlockEnd(
      interstellarContract,
      account
    );
    dispatch(fetchInterstellarsPublicDataAsync);
    return txHash;
  }, [account, dispatch, interstellarContract]);

  return { onAdjust: handleAdjust };
};

export default useAdjustBlockEnd;
