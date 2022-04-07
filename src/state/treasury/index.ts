/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { TreasuryState, Treasury, TreasuryUser } from '../types'
import fetchTreasury from './fetchTreasury'
import fetchTreasuryUser from './fetchTreasuryUser'

const initialState: TreasuryState = { data: {} }

export const treasurySlice = createSlice({
  name: 'Treasury',
  initialState,
  reducers: {
    setTreasuryPublicData: (state, action) => {
      const liveTreasuryData: Treasury = action.payload
      state.data = { ...state.data, ...liveTreasuryData }
    },
    setTreasuryUserData: (state, action) => {
      const liveTreasuryUserData: TreasuryUser = action.payload
      state.data = { ...state.data, userData: liveTreasuryUserData }
    },
  },
})

// Actions
export const { setTreasuryPublicData, setTreasuryUserData } = treasurySlice.actions

// Thunks
export const fetchTreasuryPublicDataAsync = () => async (dispatch) => {
  const treasury = await fetchTreasury()
  dispatch(setTreasuryPublicData(treasury))
}

export const fetchTreasuryUserDataAsync = (account) => async (dispatch) => {
  const treasuryUser = await fetchTreasuryUser(account)
  dispatch(setTreasuryUserData(treasuryUser))
}

export default treasurySlice.reducer