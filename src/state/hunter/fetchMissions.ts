/* eslint consistent-return: "off" */
/* eslint no-nested-ternary: "off" */
import BigNumber from "bignumber.js";
import polygalacticABI from "config/abi/polygalactic.json";
import erc20ABI from "config/abi/erc20.json";
// import gameABI from 'config/abi/game.json'
import multicall from "utils/multicall";
import { getBusdAddress, getHunterAddress } from "utils/addressHelpers";
import { tokenAddresses, lpAddresses } from "config/constants/addresses";
import getMissionDetails from "utils/getMissionDetails";

const fetchMissions = async () => {
  const polygalacticAddress = getHunterAddress();
  const { multiUSDC: usdcAddress, mADA: nativeAddress } = tokenAddresses;
  const calls = [
    {
      address: usdcAddress,
      name: "balanceOf",
      params: [lpAddresses.multiusdcMada],
    },
    {
      address: nativeAddress,
      name: "balanceOf",
      params: [lpAddresses.multiusdcMada],
    },
  ];

  const [usdcAmount, maticAmount] = await multicall(erc20ABI, calls);
  const maticPrice = (usdcAmount * 1e12) / maticAmount;

  const hunterPriceCall = [
    {
      address: polygalacticAddress,
      name: "hunterPrice",
    },
    {
      address: polygalacticAddress,
      name: "hunterPaidToken",
    },
    {
      address: polygalacticAddress,
      name: "missionAmount",
    }
  ];

  const [hunterPrice, hunterPaidToken, missionAmount] = await multicall(polygalacticABI, hunterPriceCall);
  const missionAmountNumber = new BigNumber(missionAmount[0]._hex).toNumber();

  const missionIds = []
  let i = 1
  for (i; i <= missionAmountNumber; i++) {
    missionIds.push(i)
  }

  const data = await Promise.all(
    missionIds.map(async (missionId) => {

      const [missionInfo] = await multicall(polygalacticABI, [
        {
          address: polygalacticAddress,
          name: "getMissionById",
          params: [missionId],
        },
      ]);

      const {
        multiple,
        needRarity,
        xp,
        doNotLoseXp,
        totalTry,
        totalSuccess,
        totalReward,
        missionPriceInfo,
      } = missionInfo;
      const { paidToken, earnedToken, costAddress, cost, reward } =
        missionPriceInfo;

      const {
        name,
        imageUri,
        playableWith,
        gain,
        lpAddressOfPaidToken,
        lpAddressOfEarnedToken,
      } = getMissionDetails(needRarity.toNumber(), paidToken, earnedToken);

      const tokenCalls = [
        {
          address: polygalacticAddress,
          name: "tokenInfo",
          params: [paidToken],
        },
        {
          address: polygalacticAddress,
          name: "tokenInfo",
          params: [earnedToken],
        },
      ];

      const [paidTokenInfo, earnedTokenInfo] = await multicall(
        polygalacticABI,
        tokenCalls
      );

      const paidTokenDecimals = paidTokenInfo[2] / 1;
      const earnedTokenDecimals = earnedTokenInfo[2] / 1;

      const rewardFormatted = reward / 10 ** earnedTokenDecimals;
      const priceFormatted = cost / 10 ** paidTokenDecimals;
      const totalRewardFormatted = totalReward / 10 ** earnedTokenDecimals;

      let paidTokenPriceUsdc;
      let earnedTokenPriceUsdc;

      if (missionId == 0) {
        const [
          paidTokenAmount,
          paidTokenUsdcAmount,
          earnedTokenAmount,
          earnedTokenUsdcAmount,
        ] = await multicall(erc20ABI, [
          {
            address: paidToken,
            name: "balanceOf",
            params: [lpAddressOfPaidToken],
          },
          {
            address: usdcAddress,
            name: "balanceOf",
            params: [lpAddressOfPaidToken],
          },
          {
            address: earnedToken,
            name: "balanceOf",
            params: [lpAddressOfEarnedToken],
          },
          {
            address: usdcAddress,
            name: "balanceOf",
            params: [lpAddressOfEarnedToken],
          },
        ]);

        const paidTokenDecimalDiff = paidTokenDecimals - 6; // 6 is the decimals of USDC
        const earnedTokenDecimalDiff = earnedTokenDecimals - 6; // 6 is the decimals of USDC

        paidTokenPriceUsdc =
          (paidTokenUsdcAmount / paidTokenAmount) * 10 ** paidTokenDecimalDiff;
        earnedTokenPriceUsdc =
          (earnedTokenUsdcAmount / earnedTokenAmount) *
          10 ** earnedTokenDecimalDiff;
      } else {
        const [
          paidTokenAmount,
          paidTokenMarketCapMatic,
          earnedTokenAmount,
          earnedTokenMarketCapMatic,
        ] = await multicall(erc20ABI, [
          {
            address: paidToken,
            name: "balanceOf",
            params: [lpAddressOfPaidToken],
          },
          {
            address: nativeAddress,
            name: "balanceOf",
            params: [lpAddressOfPaidToken],
          },
          {
            address: earnedToken,
            name: "balanceOf",
            params: [lpAddressOfEarnedToken],
          },
          {
            address: nativeAddress,
            name: "balanceOf",
            params: [lpAddressOfEarnedToken],
          },
        ]);

        const paidTokenDecimalDiff = 18 - paidTokenDecimals;
        const earnedTokenDecimalDiff = 18 - earnedTokenDecimals;

        paidTokenPriceUsdc =
          (paidTokenMarketCapMatic /
            paidTokenAmount /
            10 ** paidTokenDecimalDiff) *
          maticPrice;
        earnedTokenPriceUsdc =
          (earnedTokenMarketCapMatic /
            earnedTokenAmount /
            10 ** earnedTokenDecimalDiff) *
          maticPrice;
      }

      const paidTokenPriceUsdcTimesCost =
        paidTokenPriceUsdc * (cost / 10 ** paidTokenDecimals);

      const earnedTokenPriceUsdcTimesReward =
        earnedTokenPriceUsdc * (reward / 10 ** earnedTokenDecimals);

      const [balanceOfTokenInPolygalacticContract] = await multicall(erc20ABI, [
        {
          address: earnedToken,
          name: "balanceOf",
          params: [polygalacticAddress],
        },
      ]);

      const balanceOfTokenInPolygalacticContractFormatted =
        balanceOfTokenInPolygalacticContract / 10 ** earnedTokenDecimals;

      const TRY_AMOUNT = 1000;
      const MEDIOCRE_SUCCESS = 27.6;
      const SUCCESS = 22.02;
      const GREAT_SUCCESS = 17.51;
      const costTotal = paidTokenPriceUsdcTimesCost * TRY_AMOUNT;
      const rewardTotal =
        ((earnedTokenPriceUsdcTimesReward * TRY_AMOUNT) / 100) *
        (MEDIOCRE_SUCCESS + SUCCESS * 2 + GREAT_SUCCESS * 4);
      const profitPercentage =
        balanceOfTokenInPolygalacticContractFormatted <= rewardFormatted * 24
          ? 0
          : (rewardTotal / costTotal) * 100 - 100;

      const [cooldown, canBeThey] = await multicall(polygalacticABI, [
        {
          address: polygalacticAddress,
          name: "cooldown",
          params: [paidToken, earnedToken],
        },
        {
          address: polygalacticAddress,
          name: "canBeThey",
          params: [paidToken, earnedToken],
        },
      ]);
      //      const questValuePercentage = (((earnedTokenPriceUsdc.toNumber() * (reward / 1e18)) / (paidTokenPriceUsdc.toNumber() * (cost / 1e18))) * 100) - 100

      return {
        name,
        imageUri,
        playableWith,
        gain,
        missionId,
        multiple: multiple.toNumber(),
        requiredRarity: needRarity.toNumber(),
        xp: xp.toNumber(),
        doNotLoseXp: doNotLoseXp.toNumber(),
        paidTokenAddress: paidToken.toString(),
        earnedTokenAddress: earnedToken.toString(),
        costAddress: costAddress.toString(),
        price: priceFormatted,
        reward: rewardFormatted,
        totalTry: totalTry.toNumber(),
        totalSuccess: totalSuccess.toNumber(),
        totalReward: totalRewardFormatted,
        paidTokenPriceUsdc: paidTokenPriceUsdc.toFixed(3),
        earnedTokenPriceUsdc: earnedTokenPriceUsdc.toFixed(3),
        paidTokenDecimals,
        earnedTokenDecimals,
        balanceOfTokenInContract: balanceOfTokenInPolygalacticContractFormatted,
        cooldown: cooldown / 1,
        profitPercentage,
        canBeThey: canBeThey[0],
      };
    })
  );
  return { data, hunterPrice: hunterPrice / 1e18, hunterPaidToken: hunterPaidToken[0] };
};

export default fetchMissions;
