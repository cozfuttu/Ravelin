/* eslint no-unneeded-ternary: "off" */
import BigNumber from "bignumber.js";
import erc20ABI from "config/abi/erc20.json";
import polygalacticABI from "config/abi/polygalactic.json";
import multicall from "utils/multicall";
import { getRavAddress, getHunterAddress } from "utils/addressHelpers";

const DEFAULT_LEVEL_XP = 150;

const fetchUserData = async (account: string) => {
  const polygalacticAddress = getHunterAddress();
  const ravAddress = getRavAddress();

  const initialCall = [
    {
      address: polygalacticAddress,
      name: "hunterPaidToken",
    },
    {
      address: polygalacticAddress,
      name: "missionAmount",
    },
  ];

  const [hunterPaidToken, missionAmount] = await multicall(
    polygalacticABI,
    initialCall
  );

  const missionAmountNumber = new BigNumber(missionAmount[0]._hex).toNumber();

  const missionIds = [];
  let i = 1;
  for (i; i <= missionAmountNumber; i++) {
    missionIds.push(i);
  }

  const hunterAllowanceCall = [
    {
      address: hunterPaidToken[0],
      name: "allowance",
      params: [account, polygalacticAddress],
    },
  ];

  const [rawAllowancesHunter] = await multicall(erc20ABI, hunterAllowanceCall);
  const allowanceHunter = rawAllowancesHunter[0];

  const userInfoCall = [
    {
      address: polygalacticAddress,
      name: "getUserByAddress",
      params: [account],
    },
    {
      address: polygalacticAddress,
      name: "userHasToken",
      params: [account],
    },
  ];
  const [userInfo, userHasHunter] = await multicall(
    polygalacticABI,
    userInfoCall
  );
  const { tokenId, maxNftLevel, totalTry, totalSuccess } = userInfo;

  const calls = [
    {
      address: polygalacticAddress,
      name: "getHunterById",
      params: [tokenId?.toNumber()],
    },
    {
      address: polygalacticAddress,
      name: "nextTryBlock",
      params: [tokenId?.toNumber()],
    },
    {
      address: polygalacticAddress,
      name: "hunterInMission",
      params: [tokenId?.toNumber(), account],
    },
  ];

  const [userHunterInfo, nextTryBlockResult, hunterInMission] = await multicall(
    polygalacticABI,
    calls
  );

  console.log("hunterInMissionContract: ", hunterInMission[0].toNumber());

  const {
    name,
    level,
    rarity,
    xp,
    totalXp,
    owner,
    creator,
    totalTry: hunterTotalTry,
    totalSuccess: hunterTotalSuccess,
  } = userHunterInfo;

  const hunterNeedXpToLevelUp = DEFAULT_LEVEL_XP * rarity.toNumber();

  const missionData = await Promise.all(
    missionIds.map(async (missionId) => {
      const missionInfoCall = [
        {
          address: polygalacticAddress,
          name: "getMissionById",
          params: [missionId],
        },
      ];
      const [missionInfo] = await multicall(polygalacticABI, missionInfoCall);
      const { missionPriceInfo } = missionInfo;
      const { paidToken, earnedToken } = missionPriceInfo;

      const allowanceCall = [
        {
          address: paidToken,
          name: "allowance",
          params: [account, polygalacticAddress],
        },
      ];
      const [rawAllowancesMission] = await multicall(erc20ABI, allowanceCall);
      const allowanceMission = rawAllowancesMission[0];

      const calls = [
        {
          address: polygalacticAddress,
          name: "nextPlayTime",
          params: [account, paidToken, earnedToken],
        },
      ];

      const [nextPlayTime] = await multicall(polygalacticABI, calls);

      return {
        missionId,
        allowanceMission: new BigNumber(allowanceMission._hex).toString(),
        hunterNextPlayTime: nextPlayTime / 1,
      };
    })
  );

  return {
    allowanceHunter: new BigNumber(allowanceHunter._hex).toString(),
    tokenId: tokenId.toNumber(),
    maxNftLevel: maxNftLevel.toNumber(),
    totalTry: totalTry.toNumber(),
    totalSuccess: totalSuccess.toNumber(),
    userHasHunter: userHasHunter[0],
    hunterName: name.toString(),
    hunterLevel: level.toNumber(),
    hunterRarity: rarity.toNumber(),
    hunterXp: xp.toNumber(),
    hunterNeedXpToLevelUp,
    hunterTotalXp: totalXp.toNumber(),
    hunterOwner: owner.toString(),
    hunterCreator: creator.toString(),
    hunterTotalTry: hunterTotalTry.toNumber(),
    hunterTotalSuccess: hunterTotalSuccess.toNumber(),
    hunterNextTryBlock: nextTryBlockResult[0].toNumber(),
    hunterInMission: hunterInMission[0].toNumber(),
    missionData,
  };
};

export default fetchUserData;
