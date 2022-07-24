import { useWallet } from "@binance-chain/bsc-use-wallet";
import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { useERC20 } from "./useContract";
import useWeb3 from "./useWeb3";

export const useTransfer = (tokenAddress: string, receiverAddress: string) => {
  const { account } = useWallet();
  const web3 = useWeb3();
  const contract = useERC20(tokenAddress);

  const handleTransfer = useCallback(
    async (amount: string) => {
      console.log(amount);
      const transferResult = await contract.methods
        .transfer(receiverAddress, amount)
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx;
        });

      return transferResult;
    },
    [web3, contract]
  );

  return { onTransfer: handleTransfer };
};
