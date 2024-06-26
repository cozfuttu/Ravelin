import { useCallback } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useDispatch } from "react-redux";
import {
  fetchFarmUserDataAsync,
  fetchMasonDataAsync,
  fetchInterstellarUserDataAsync,
} from "state/actions";
import { stake, stakeInterstellar, stakeMasonry } from "utils/callHelpers";
import {
  useGenesisPoolsContract,
  useMasonryContract,
  useRavPoolsContract,
  useRsharePoolsContract,
  useInterstellarContract,
} from "./useContract";

export const useStakeGenesisPools = (pid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterChefContract = useGenesisPoolsContract();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account);
      dispatch(fetchFarmUserDataAsync(account));
      return txHash;
    },
    [account, dispatch, masterChefContract, pid]
  );

  return { onStakeGenesisPools: handleStake };
};

export const useStakeRsharePools = (pid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterChefContract = useRsharePoolsContract();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account);
      dispatch(fetchFarmUserDataAsync(account));
      return txHash;
    },
    [account, dispatch, masterChefContract, pid]
  );

  return { onStakeRsharePools: handleStake };
};

export const useStakeRavPools = (pid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterChefContract = useRavPoolsContract();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account);
      dispatch(fetchFarmUserDataAsync(account));
      return txHash;
    },
    [account, dispatch, masterChefContract, pid]
  );

  return { onStakeRavPools: handleStake };
};

export const useStakeMasonry = () => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masonryContract = useMasonryContract();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeMasonry(masonryContract, amount, account);
      dispatch(fetchMasonDataAsync(account));
      return txHash;
    },
    [account, dispatch, masonryContract]
  );

  return { onStake: handleStake };
};

export const useStakeInterstellar = (contractAddress: string) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterChefContract = useInterstellarContract(contractAddress);

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeInterstellar(
        masterChefContract,
        amount,
        account
      );
      dispatch(fetchInterstellarUserDataAsync(account));
      return txHash;
    },
    [account, dispatch, masterChefContract]
  );

  return { onStakeInterstellar: handleStake };
};
