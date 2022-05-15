import { useEffect, useState } from "react";
import { AbiItem } from "web3-utils";
import { ContractOptions } from "web3-eth-contract";
import useWeb3 from "hooks/useWeb3";
import {
  getGenesisPoolsAddress,
  getMasonryAddress,
  getRavAddress,
  getRbondAddress,
  getRshareAddress,
  getRavPoolsAddress,
  getRsharePoolsAddress,
  getTreasuryAddress,
} from "utils/addressHelpers";
import erc20 from "config/abi/erc20.json";
import ravABI from "config/abi/rav.json";
import rshareABI from "config/abi/rshare.json";
import rbondABI from "config/abi/rbond.json";
import genesisPoolsABI from "config/abi/genesisPools.json";
import rsharePoolsABI from "config/abi/rsharePools.json";
import ravPoolsABI from "config/abi/ravPools.json";
import masonryABI from "config/abi/masonry.json";
import treasuryABI from "config/abi/treasury.json";
import interstellarABI from "config/abi/interstellar.json";

export const useContract = (
  abi: AbiItem,
  address: string,
  contractOptions?: ContractOptions
) => {
  const web3 = useWeb3();
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions)
  );

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions));
  }, [abi, address, contractOptions, web3]);

  return contract;
};

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const erc20Abi = erc20 as unknown as AbiItem;
  return useContract(erc20Abi, address);
};

export const useRav = () => {
  const abi = ravABI as unknown as AbiItem;
  return useContract(abi, getRavAddress());
};
export const useRshare = () => {
  const abi = rshareABI as unknown as AbiItem;
  return useContract(abi, getRshareAddress());
};
export const useRbond = () => {
  const abi = rbondABI as unknown as AbiItem;
  return useContract(abi, getRbondAddress());
};
export const useGenesisPoolsContract = () => {
  const abi = genesisPoolsABI as unknown as AbiItem;
  return useContract(abi, getGenesisPoolsAddress());
};
export const useRsharePoolsContract = () => {
  const abi = rsharePoolsABI as unknown as AbiItem;
  return useContract(abi, getRsharePoolsAddress());
};
export const useRavPoolsContract = () => {
  const abi = ravPoolsABI as unknown as AbiItem;
  return useContract(abi, getRavPoolsAddress());
};
export const useMasonryContract = () => {
  const abi = masonryABI as unknown as AbiItem;
  return useContract(abi, getMasonryAddress());
};
export const useTreasuryContract = () => {
  const abi = treasuryABI as unknown as AbiItem;
  return useContract(abi, getTreasuryAddress());
};
export const useInterstellarContract = (contractAddress: string) => {
  const abi = interstellarABI as unknown as AbiItem;
  return useContract(abi, contractAddress);
};

export default useContract;
