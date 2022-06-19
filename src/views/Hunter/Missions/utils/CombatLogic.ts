/* eslint no-nested-ternary: "off" */

import { getRandomNumber, getRandomFightTurnData } from "./CombatTextUtils";
import { CombatData } from "config/constants/types";

export const INITIAL_FIGHTER_HEALTH = 100;
export const INITIAL_SPIDER_COUNT = 0;

export const MAX_COMBAT_TURN_COUNT = 20;

export const MIN_BUG_COUNT_MEDICORE_SUCCESS = 30;
export const MIN_BUG_COUNT_SUCCESS = 35;
export const MIN_BUG_COUNT_GREAT_SUCCESS = 40;

const getHunterAttackChance = (
  missionResult: string /* '1' | '2' | '3' | '4' */
): number => {
  switch (missionResult) {
    case "1":
      return 60;
    case "2":
      return 62;
    case "3":
      return 65;
    case "4":
      return 68;
    default:
      return 50;
  }
};

const getRandomCombatData = (
  missionResult: string /* '1' | '2' | '3' | '4' */
): CombatData[] => {
  const winnerIndex = missionResult === "1" ? 1 : 0;
  const loserIndex = winnerIndex === 0 ? 1 : 0;

  const fighterHealts = [INITIAL_FIGHTER_HEALTH, INITIAL_SPIDER_COUNT];

  const combatDataArray: CombatData[] = [];

  const hunterAttackChance = getHunterAttackChance(missionResult);

  let i = 0;

  while (
    i < MAX_COMBAT_TURN_COUNT &&
    (loserIndex === 1 || fighterHealts[loserIndex] > 0)
  ) {
    const random100 = getRandomNumber(100);
    let attackerIndex = 0;

    if (random100 < hunterAttackChance) {
      attackerIndex = 0;
    } else {
      attackerIndex = 1;
    }

    const defenderIndex = attackerIndex === 0 ? 1 : 0;

    const isWinnerAttacked = winnerIndex === attackerIndex;

    const { id, minValue, maxValue, animationName } =
      getRandomFightTurnData(attackerIndex);
    const valueChange =
      minValue || maxValue
        ? minValue + getRandomNumber(maxValue - minValue + 1)
        : 0; // damage or heal amount

    if (id === "heal") {
      if (fighterHealts[0] + valueChange <= 100) {
        const oldHealths = [...fighterHealts];
        fighterHealts[0] += valueChange;

        const combatData = {
          id,
          oldHealths,
          newHealths: [...fighterHealts],
          attackerIndex,
          animationName,
        };

        combatDataArray.push(combatData);
        i++;
      }
    } else if (
      isWinnerAttacked ||
      attackerIndex === 0 ||
      fighterHealts[winnerIndex] - valueChange > 0
    ) {
      const oldHealths = [...fighterHealts];
      if (attackerIndex === 0) {
        fighterHealts[defenderIndex] += valueChange;
      } else {
        fighterHealts[defenderIndex] -= valueChange;
      }

      const combatData = {
        id,
        oldHealths,
        newHealths: [...fighterHealts],
        attackerIndex,
        animationName: fighterHealts[0] < 0 ? "HunterDead" : animationName,
      };

      combatDataArray.push(combatData);
      i++;
    }

    if (i === 20 && winnerIndex === 0) {
      const combatData = {
        id,
        oldHealths: fighterHealts,
        newHealths: fighterHealts,
        attackerIndex,
        animationName: "HunterAlive",
      };

      combatDataArray.push(combatData);
    }
  }

  const combatData = {
    id: "end",
    oldHealths: fighterHealts,
    newHealths: fighterHealts,
    attackerIndex: 0,
    animationName: winnerIndex === 0 ? "HunterEndAlive" : "HunterEndDead",
  };

  combatDataArray.push(combatData);

  return combatDataArray;
};

const getCombatData = (
  missionResult: string /* '1' | '2' | '3' | '4' */
): CombatData[] => {
  let combatDataArray;
  let isCorrectCombat = false;

  if (missionResult === "1") {
    while (!isCorrectCombat) {
      const combatData = getRandomCombatData(missionResult);
      // console.log('asjkdsa11', combatData)

      const lastCombatData = combatData[combatData.length - 1];

      if (
        combatData.length > 17 &&
        lastCombatData.newHealths[0] < 0 &&
        lastCombatData.newHealths[1] > 26
      ) {
        isCorrectCombat = true;
        combatDataArray = combatData;
      }
    }

    return combatDataArray;
  }

  const minSpiderCount =
    missionResult === "2"
      ? MIN_BUG_COUNT_MEDICORE_SUCCESS
      : missionResult === "3"
      ? MIN_BUG_COUNT_SUCCESS
      : MIN_BUG_COUNT_GREAT_SUCCESS;

  const maxSpiderCount =
    missionResult === "2"
      ? MIN_BUG_COUNT_SUCCESS - 1
      : missionResult === "3"
      ? MIN_BUG_COUNT_GREAT_SUCCESS - 1
      : 999;

  while (!isCorrectCombat) {
    const combatData = getRandomCombatData(missionResult);
    // console.log('asjkdsa11', combatData)
    const lastCombatData = combatData[combatData.length - 1];

    if (
      lastCombatData.newHealths[1] <= maxSpiderCount &&
      lastCombatData.newHealths[1] >= minSpiderCount
    ) {
      isCorrectCombat = true;
      combatDataArray = combatData;
    }
  }

  return combatDataArray;
};

export default getCombatData;
