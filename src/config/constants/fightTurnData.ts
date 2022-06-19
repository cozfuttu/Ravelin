import { HunterFightTurnData } from "./types";

const hunterFightTurnData: HunterFightTurnData = {
  // bug moves
  takeDamage: {
    id: "takeDamage",
    animationName: "HunterDamage",
    minValue: 20,
    maxValue: 30,
  },
  block: {
    id: "block",
    animationName: "HunterBlock",
    minValue: 0,
    maxValue: 0,
  },

  // hunter moves
  shoot: {
    id: "shoot",
    animationName: "HunterFire",
    minValue: 0,
    maxValue: 4,
  },
  heal: {
    id: "heal",
    animationName: "HunterHeal",
    minValue: 20,
    maxValue: 35,
  },
  grenade: {
    id: "grenade",
    animationName: "HunterGrenade",
    minValue: 2,
    maxValue: 7,
  },
};

export default hunterFightTurnData;
