import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  shops: [
    {
      id: Date.now(),
      store_name: "General Store 1",
      category: "Grocery",
      area: "Thane",
      opening_date: dayjs("2022-06-21T21:01:12.000Z"),
      closing_date: dayjs("2022-06-30T21:01:12.000Z"),
    },
    {
      id: Date.now(),
      store_name: "General Store 2",
      category: "Butcher",
      area: "Nagpur",
      opening_date: dayjs("2022-06-21T21:01:12.000Z"),
      closing_date: dayjs("2022-06-30T21:01:12.000Z"),
    },
    {
      id: Date.now(),
      store_name: "General Store 3",
      category: "Baker",
      area: "Pune",
      opening_date: dayjs("2022-06-21T21:01:12.000Z"),
      closing_date: dayjs("2022-06-30T21:01:12.000Z"),
    },
    {
      id: Date.now(),
      store_name: "General Store 4",
      category: "Stationary",
      area: "Nashik",
      opening_date: dayjs("2022-06-21T21:01:12.000Z"),
      closing_date: dayjs("2022-06-30T21:01:12.000Z"),
    },
  ],
};

export const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    addShop: (state, action) => {
      state.shops = [...state.shops, { ...action.payload, id: Date.now() }];
    },
    updateShop: (state, action) => {
      let shop = state.shops.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.shops[shop] = action.payload;
    },
    deleteShop: (state, action) => {
      state.shops = state.shops.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const selectShops = (state) => {
  return state.shop.shops.map((shop) => {
    return {
      ...shop,
      status:
        dayjs() > dayjs(shop.opening_date) && dayjs() < dayjs(shop.closing_date)
          ? "Open"
          : "Close",
    };
  });
};

export const { addShop, updateShop, deleteShop } = shopSlice.actions;
export default shopSlice.reducer;
