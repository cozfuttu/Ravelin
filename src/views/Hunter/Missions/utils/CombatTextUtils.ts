import { FigthTurnData } from "config/constants/types";

import fightTurnData from "config/constants/fightTurnData";

export const getRandomNumber = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber);

export const getRandomFightTurnData = (
  attackerIndex: number
): FigthTurnData => {
  let fightData;

  if (attackerIndex === 0) {
    const randomNumber = getRandomNumber(100);

    if (randomNumber < 65) {
      fightData = fightTurnData.shoot;
    } else if (randomNumber < 83) {
      fightData = fightTurnData.heal;
    } else {
      fightData = fightTurnData.grenade;
    }
  } else {
    const randomNumber = getRandomNumber(100);

    if (randomNumber < 85) {
      fightData = fightTurnData.takeDamage;
    } else {
      fightData = fightTurnData.block;
    }
  }

  return fightData;
};
