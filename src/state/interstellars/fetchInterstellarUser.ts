import BigNumber from "bignumber.js";
import erc20ABI from "config/abi/erc20.json";
import interstellarAbi from "config/abi/interstellar.json";
import multicall from "utils/multicall";
import interstellarsConfig from "config/constants/interstellars";

const fetchInterstellarUserData = async (account) => {
  const data = await Promise.all(
    interstellarsConfig.map(async (interstellarConfig) => {
      const tokenAddressCalls = [
        {
          address: interstellarConfig.contractAddress,
          name: "stakeToken",
        },
      ];
      const [stakeTokenAddress] = await multicall(
        interstellarAbi,
        tokenAddressCalls
      );

      const erc20AbiCalls = [
        {
          address: stakeTokenAddress[0],
          name: "allowance",
          params: [account, interstellarConfig.contractAddress],
        },
        { address: stakeTokenAddress[0], name: "balanceOf", params: [account] },
      ];

      const [allowanceResponse, tokenBalanceResponse] = await multicall(
        erc20ABI,
        erc20AbiCalls
      );

      const interstellarAbiCalls = [
        {
          address: interstellarConfig.contractAddress,
          name: "userInfo",
          params: [account],
        },
        {
          address: interstellarConfig.contractAddress,
          name: "pendingReward",
          params: [account],
        },
      ];

      const [userInfoResponse, pendingEarningsResponse] = await multicall(
        interstellarAbi,
        interstellarAbiCalls
      );

      return {
        allowance: new BigNumber(allowanceResponse).toJSON(),
        tokenBalance: new BigNumber(tokenBalanceResponse).toJSON(),
        stakedBalance: new BigNumber(userInfoResponse[0]._hex).toJSON(),
        //        nextHarvestUntil: new BigNumber(userInfoResponse[3]._hex).toJSON(),
        earnings: new BigNumber(pendingEarningsResponse).toJSON(),
      };
    })
  );
  return data;
};

export default fetchInterstellarUserData;
