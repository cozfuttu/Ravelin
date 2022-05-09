/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import interstellarConfig from "config/constants/interstellars";
import fetchInterstellars from "./fetchInterstellars";
import fetchInterstellarUserData from "./fetchInterstellarUser";
import { InterstellarsState, Interstellar } from "../types";

const initialState: InterstellarsState = { data: [...interstellarConfig] };

export const interstellarsSlice = createSlice({
  name: "Interstellars",
  initialState,
  reducers: {
    setInterstellarsPublicData: (state, action) => {
      const liveFarmsData: Interstellar[] = action.payload;
      liveFarmsData.forEach((interstellarData, index) => {
        state.data[index] = { ...state.data[index], ...interstellarData };
      });
    },
    setInterstellarUserData: (state, action) => {
      const arrayOfUserDataObjects = action.payload;
      arrayOfUserDataObjects.forEach((userDataEl, index) => {
        state.data[index] = { ...state.data[index], userData: userDataEl };
      });
    },
  },
});

// Actions
export const { setInterstellarsPublicData, setInterstellarUserData } =
  interstellarsSlice.actions;

// Thunks
export const fetchInterstellarsPublicDataAsync = () => async (dispatch) => {
  const interstellars = await fetchInterstellars();
  dispatch(setInterstellarsPublicData(interstellars));
};
export const fetchInterstellarUserDataAsync = (account) => async (dispatch) => {
  const userInterstellarDataArray = await fetchInterstellarUserData(account);
  dispatch(setInterstellarUserData(userInterstellarDataArray));
};

export default interstellarsSlice.reducer;
