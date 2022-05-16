/* eslint no-unneeded-ternary: "off" */
import BigNumber from "bignumber.js";
import erc20ABI from "config/abi/erc20.json";
import polygalacticABI from "config/abi/polygalactic.json";
import multicall from "utils/multicall";
import { getRavAddress, getHunterAddress } from "utils/addressHelpers";
import polygalacticMissions from "config/constants/missions";

const fetchUserData = async (account: string) => {
  const polygalacticAddress = getHunterAddress();
  const ravAddress = getRavAddress();
  const data = await Promise.all(
    polygalacticMissions.map(async (mission) => {
      const missionInfoCall = [
        {
          address: polygalacticAddress,
          name: "getMissionById",
          params: [mission.missionId],
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
        {
          address: ravAddress,
          name: "allowance",
          params: [account, polygalacticAddress],
        },
      ];
      const [rawAllowancesMission, rawAllowancesHunter] = await multicall(
        erc20ABI,
        allowanceCall
      );
      const allowanceMission = rawAllowancesMission[0];
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
          name: "nextPlayTime",
          params: [account, paidToken, earnedToken],
        },
        {
          address: polygalacticAddress,
          name: "hunterInMission",
          params: [tokenId?.toNumber(), account],
        },
      ];

      const [
        userHunterInfo,
        nextTryBlockResult,
        nextPlayTime,
        hunterInMission,
      ] = await multicall(polygalacticABI, calls);

      const DEFAULT_LEVEL_XP = 150;

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

      return {
        allowanceHunter,
        allowanceMission,
        tokenId: tokenId.toNumber(),
        maxNftLevel: maxNftLevel.toNumber(),
        totalTry: totalTry.toNumber(),
        totalSuccess: totalSuccess.toNumber(),
        userHasHunter,
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
        hunterNextTryTime: nextPlayTime / 1,
        hunterInMission: hunterInMission[0].toNumber(),
      };
    })
  );
  return data;
};

export default fetchUserData;
