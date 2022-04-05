/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { Masonry, MasonryState, Mason } from '../types'
import fetchMasonry from './fetchMasonry'
import fetchMason from './fetchMason'

const initialState: MasonryState = { data: {} }

export const masonrySlice = createSlice({
  name: 'Masonry',
  initialState,
  reducers: {
    setMasonryPublicData: (state, action) => {
      const liveMasonryData: Masonry = action.payload
      state.data = { ...state.data, ...liveMasonryData }
    },
    setMasonData: (state, action) => {
      const liveMasonData: Mason = action.payload
      state.data = { ...state.data, userData: liveMasonData }
    },
  },
})

// Actions
export const { setMasonryPublicData, setMasonData } = masonrySlice.actions

// Thunks
export const fetchMasonryPublicDataAsync = () => async (dispatch) => {
  const masonry = await fetchMasonry()
  dispatch(setMasonryPublicData(masonry))
}
export const fetchMasonDataAsync = (account) => async (dispatch) => {
  const userFarmsDataArray = await fetchMason(account)
  dispatch(setMasonData(userFarmsDataArray))
}

export default masonrySlice.reducer