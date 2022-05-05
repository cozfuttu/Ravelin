import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { provider } from "web3-core";
import cakeABI from "config/abi/cake.json";
import { getContract } from "utils/web3";
import { getTokenBalance } from "utils/erc20";
import {
  getRavAddress,
  getRshareAddress,
  getRbondAddress,
  getRavNativeLPAddress,
  getRshareNativeLPAddress,
} from "utils/addressHelpers";
import useRefresh from "./useRefresh";
import useWeb3 from "./useWeb3";

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account, ethereum }: { account: string; ethereum: provider } =
    useWallet();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account);
      setBalance(new BigNumber(res));
    };

    if (account && ethereum) {
      fetchBalance();
    }
  }, [account, ethereum, tokenAddress, fastRefresh]);

  return balance;
};

export const useTokenBalanceOfContract = (
  tokenAddress: string,
  contractAddress: string
) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { currentProvider } = useWeb3();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(
        currentProvider,
        tokenAddress,
        contractAddress
      );
      setBalance(new BigNumber(res));
    };

    if (currentProvider) {
      fetchBalance();
    }
  }, [contractAddress, currentProvider, tokenAddress, slowRefresh]);

  return balance;
};

export const useTotalSupplyRav = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getRavAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useTotalSupplyRshare = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getRshareAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useTotalSupplyRbond = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getRbondAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useTotalSupplyRavNativeLP = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getRavNativeLPAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useTotalSupplyRshareNativeLP = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getRshareNativeLPAddress());
      const supply = await cakeContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useBurnedBalanceRav = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const ravAddress = getRavAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(cakeABI, ravAddress);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [ravAddress, slowRefresh]);

  return balance;
};

export const useBurnedBalanceRshare = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const rshareAddress = getRshareAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(cakeABI, rshareAddress);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [rshareAddress, slowRefresh]);

  return balance;
};

export const useBurnedBalanceRbond = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const rbondAddress = getRbondAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(cakeABI, rbondAddress);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [rbondAddress, slowRefresh]);

  return balance;
};

export const useBurnedBalanceRavNativeLP = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const ravNativeLPAddress = getRavNativeLPAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      // CHANGE TO LP ABI
      const cakeContract = getContract(cakeABI, ravNativeLPAddress);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [ravNativeLPAddress, slowRefresh]);

  return balance;
};

export const useBurnedBalanceRshareNativeLP = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();
  const rshareNativeLPAddress = getRshareNativeLPAddress();

  useEffect(() => {
    const fetchBalance = async () => {
      // CHANGE TO LP ABI
      const cakeContract = getContract(cakeABI, rshareNativeLPAddress);
      const bal = await cakeContract.methods
        .balanceOf("0x000000000000000000000000000000000000dEaD")
        .call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [rshareNativeLPAddress, slowRefresh]);

  return balance;
};

export default useTokenBalance;
