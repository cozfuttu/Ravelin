import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useCallback } from "react";
import { useERC20 } from "./useContract";

export const useTransfer = (tokenAddress: string, receiverAddress: string) => {
  const { account } = useWallet();
  const contract = useERC20(tokenAddress);

  const handleTransfer = useCallback(
    async (amount: string) => {
      const transferResult = await contract.methods
        .transfer(receiverAddress, amount)
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx;
        });

      return transferResult;
    },
    [contract, account, receiverAddress]
  );

  return { onTransfer: handleTransfer };
};
