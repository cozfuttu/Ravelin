import BigNumber from "bignumber.js";
import erc20 from "config/abi/erc20.json";
import interstellarAbi from "config/abi/interstellar.json";
import multicall from "utils/multicall";
import { getBusdAddress } from "utils/addressHelpers";
import interstellars from "config/constants/interstellars";

const fetchInterstellars = async () => {
  const usdcAddress = getBusdAddress();
  const nativeAddress = "0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9";
  const nativeUsdcLPAddress = "0xB56964a0617b2b760C8B6D8040e99cda29D5203b";
  const maticPriceCalls = [
    {
      address: usdcAddress,
      name: "balanceOf",
      params: [nativeUsdcLPAddress],
    },
    {
      address: nativeAddress,
      name: "balanceOf",
      params: [nativeUsdcLPAddress],
    },
  ];

  const [usdcAmount, maticAmount] = await multicall(erc20, maticPriceCalls);
  const maticPrice = (usdcAmount * 1e12) / maticAmount;
  const data = await Promise.all(
    interstellars.map(async (interstellarConfig) => {
      const isLP = interstellarConfig.isStakeLP;
      const tokenAddressCalls = [
        {
          address: interstellarConfig.contractAddress,
          name: "stakeToken",
        },
        {
          address: interstellarConfig.contractAddress,
          name: "rewardToken",
        },
      ];
      const [stakeTokenAddress, rewardTokenAddress] = await multicall(
        interstellarAbi,
        tokenAddressCalls
      );

      const calls = [
        // Balance of staked token in the interstellar contract
        {
          address: stakeTokenAddress[0],
          name: "balanceOf",
          params: [interstellarConfig.contractAddress],
        },
        // Balance of rewarded token on interstellar contract
        {
          address: rewardTokenAddress[0],
          name: "balanceOf",
          params: [interstellarConfig.contractAddress],
        },
        // Staked Token decimals
        {
          address: stakeTokenAddress[0],
          name: "decimals",
        },
        // Rewarded Token decimals
        {
          address: rewardTokenAddress[0],
          name: "decimals",
        },
      ];

      const [
        tokenBalance,
        rewardTokenBalance,
        stakedTokenDecimals,
        rewardTokenDecimals,
      ] = await multicall(erc20, calls);

      const stakedTokenExactAmount = new BigNumber(tokenBalance).div(
        new BigNumber(10).pow(stakedTokenDecimals[0])
      );
      const rewardTokenExactAmount = new BigNumber(rewardTokenBalance).div(
        new BigNumber(10).pow(rewardTokenDecimals[0])
      );

      const tokenPriceCalls = [
        {
          address: nativeAddress,
          name: "balanceOf",
          params: [interstellarConfig.stakeLpAddress],
        },
        {
          address: stakeTokenAddress[0],
          name: "balanceOf",
          params: [interstellarConfig.stakeLpAddress],
        },
        {
          address: nativeAddress,
          name: "balanceOf",
          params: [interstellarConfig.rewardLpAddress],
        },
        {
          address: rewardTokenAddress[0],
          name: "balanceOf",
          params: [interstellarConfig.rewardLpAddress],
        },
        {
          address: stakeTokenAddress[0],
          name: "totalSupply",
        },
      ];

      const [
        stakeLpMaticAmount,
        stakeLpStakeTokenAmount,
        rewardLpMaticAmount,
        rewardLpRewardTokenAmount,
        stakeTokenTotalSupply,
      ] = await multicall(erc20, tokenPriceCalls);
      const stakeLpMaticExactAmount = stakeLpMaticAmount / 1e18;
      const stakeLpStakeTokenExactAmount =
        stakeLpStakeTokenAmount / 10 ** stakedTokenDecimals[0];
      const rewardLpMaticExactAmount = rewardLpMaticAmount / 1e18;
      const rewardLpRewardTokenExactAmount =
        rewardLpRewardTokenAmount / 10 ** rewardTokenDecimals[0];
      const stakeTokenPrice = isLP
        ? (stakeLpMaticExactAmount * maticPrice * 2) /
          (stakeTokenTotalSupply / 1e18)
        : (stakeLpMaticExactAmount / stakeLpStakeTokenExactAmount) * maticPrice;
      const rewardTokenPrice =
        (rewardLpMaticExactAmount / rewardLpRewardTokenExactAmount) *
        maticPrice;

      let rewardTokenPerBlock;
      let startBlock;
      let endBlock;

      try {
        [rewardTokenPerBlock, startBlock, endBlock] = await multicall(
          interstellarAbi,
          [
            {
              address: interstellarConfig.contractAddress,
              name: "rewardPerEpoch",
            },
            {
              address: interstellarConfig.contractAddress,
              name: "startEpoch",
            },
            {
              address: interstellarConfig.contractAddress,
              name: "bonusEndEpoch",
            },
          ]
        );
      } catch (error) {
        console.log("InterstellarABI poolInfo call error", error);
      }

      return {
        ...interstellarConfig,
        stakeTokenAddress: stakeTokenAddress[0],
        rewardTokenAddress: rewardTokenAddress[0],
        stakedTokenAmount: stakedTokenExactAmount.toJSON(),
        rewardTokenAmount: rewardTokenExactAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount,
        //        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        //        stakeTokenPriceVsRewardToken: tokenPriceVsQuote.toJSON(),
        //        poolWeight: poolWeight?.toNumber(),
        //        multiplier: allocPoint ? `${allocPoint.div(100).toString()}X` : '-',
        //        depositFeeBP: info?.depositFeeBP,
        rewardTokenPerBlock: new BigNumber(rewardTokenPerBlock).toNumber(),
        startBlock: new BigNumber(startBlock).toNumber(),
        endBlock: new BigNumber(endBlock).toNumber(),
        stakedTokenDecimals: stakedTokenDecimals[0],
        rewardTokenDecimals: rewardTokenDecimals[0],
        stakeTokenPrice: new BigNumber(stakeTokenPrice).toJSON(),
        rewardTokenPrice: new BigNumber(rewardTokenPrice).toJSON(),
        //        harvestInterval,
      };
    })
  );
  return data;
};

export default fetchInterstellars;
