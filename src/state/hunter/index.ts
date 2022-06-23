/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import fetchMissions from "./fetchMissions";
import fetchUserData from "./fetchPlayer";
import { Hunter, HunterUserData } from "../types";
import BigNumber from "bignumber.js";

const initialUserState: HunterUserData = {
  allowanceHunter: new BigNumber(0).toString(),
  tokenId: 0,
  maxNftLevel: 0,
  totalTry: 0,
  totalSuccess: 0,
  totalReward: 0,
  userHasHunter: false,
  hunterName: "Loading",
  hunterLevel: 0,
  hunterRarity: 1,
  hunterXp: 0,
  hunterNeedXpToLevelUp: 0,
  hunterTotalXp: 0,
  hunterOwner: "",
  hunterCreator: "",
  hunterTotalTry: 0,
  hunterTotalSuccess: 0,
  hunterNextTryBlock: 0,
  hunterInMission: 0,
  missionData: [
    {
      missionId: 0,
      allowanceMission: new BigNumber(0).toString(),
      hunterNextPlayTime: 0,
    },
  ],
};

const initialState: Hunter = {
  hunterPrice: 0,
  hunterPaidToken: "",
  pause: true,
  userData: initialUserState,
  missions: [],
};

export const hunterSlice = createSlice({
  name: "Hunter",
  initialState,
  reducers: {
    setGameUserData: (state, action) => {
      const userData = action.payload;
      return { ...state, userData };
    },
    setMissionData: (state, action) => {
      const { data, hunterPrice, hunterPaidToken, pause } = action.payload;
      return { ...state, missions: data, hunterPrice, hunterPaidToken, pause };
    },
  },
});

// Actions
export const { setGameUserData, setMissionData } = hunterSlice.actions;

// Thunks

export const fetchPlayerDataAsync = (account: string) => async (dispatch) => {
  const userDataObject = await fetchUserData(account);
  dispatch(setGameUserData(userDataObject));
};

export const fetchMissionDataAsync = () => async (dispatch) => {
  const MissionObjects = await fetchMissions();
  dispatch(setMissionData(MissionObjects));
};

export default hunterSlice.reducer;
