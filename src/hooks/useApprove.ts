import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { Contract } from "web3-eth-contract";
import { useDispatch } from "react-redux";
import {
  fetchFarmUserDataAsync,
  fetchInterstellarUserDataAsync,
  fetchMasonDataAsync,
  fetchPlayerDataAsync,
  fetchTreasuryUserDataAsync,
} from "state/actions";
import { approve } from "utils/callHelpers";
import {
  useGenesisPoolsContract,
  useRsharePoolsContract,
  useMasonryContract,
  useTreasuryContract,
  useRavPoolsContract,
  useHunterContract,
  useERC20,
} from "./useContract";

// Approve a Farm
export const useApproveGenesisPools = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterChefContract = useGenesisPoolsContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      dispatch(fetchFarmUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterChefContract]);

  return { onApproveGenesisPools: handleApprove };
};

export const useApproveRsharePools = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterChefContract = useRsharePoolsContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      dispatch(fetchFarmUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterChefContract]);

  return { onApproveRsharePools: handleApprove };
};

export const useApproveRavPools = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterChefContract = useRavPoolsContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      dispatch(fetchFarmUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterChefContract]);

  return { onApproveRavPools: handleApprove };
};

export const useApproveMasonry = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterChefContract = useMasonryContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      dispatch(fetchMasonDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterChefContract]);

  return { onApprove: handleApprove };
};

export const useApproveTreasury = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterChefContract = useTreasuryContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      dispatch(fetchTreasuryUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterChefContract]);

  return { onApprove: handleApprove };
};

export const useApproveInterstellar = (
  tokenContract: Contract,
  interstellarContract: Contract
) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, interstellarContract, account);
      dispatch(fetchInterstellarUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, tokenContract, interstellarContract]);

  return { onApprove: handleApprove };
};

export const useApproveHunter = (paidTokenAddress: string) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const hunterContract = useHunterContract();
  const ravContract = useERC20(paidTokenAddress);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(ravContract, hunterContract, account);
      dispatch(fetchPlayerDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, ravContract, hunterContract]);

  return { onApprove: handleApprove };
};

export const useApproveMission = (tokenContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const polygalacticContract = useHunterContract();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, polygalacticContract, account);
      dispatch(fetchPlayerDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, tokenContract, polygalacticContract]);

  return { onApprove: handleApprove };
};
