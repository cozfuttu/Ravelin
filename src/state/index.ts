import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import masonryReducer from './masonry'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    masonry: masonryReducer,
  },
})
