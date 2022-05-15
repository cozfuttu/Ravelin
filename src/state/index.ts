import { configureStore } from "@reduxjs/toolkit";
import farmsReducer from "./farms";
import masonryReducer from "./masonry";
import treasuryReducer from "./treasury";
import interstellarReducer from "./interstellars";

export default configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    farms: farmsReducer,
    masonry: masonryReducer,
    treasury: treasuryReducer,
    interstellar: interstellarReducer,
  },
});
