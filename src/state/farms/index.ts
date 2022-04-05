/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchFarms from './fetchFarms'
import fetchFarmUserData from './fetchFarmUser'
import { FarmsState, Farm } from '../types'

const initialState: FarmsState = { data: [...farmsConfig] }

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      liveFarmsData.forEach((farmData, index) => {
        state.data[index] = { ...state.data[index], ...farmData }
      })
    },
    setFarmUserData: (state, action) => {
      const arrayOfUserDataObjects = action.payload
      arrayOfUserDataObjects.forEach((userDataEl, index) => {
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData } = farmsSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmsDataArray = await fetchFarmUserData(account)
  dispatch(setFarmUserData(userFarmsDataArray))
}

export default farmsSlice.reducer
