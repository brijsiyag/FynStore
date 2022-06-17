import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import utilReducer from "../features/util/utilSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    util: utilReducer,
  },
});
