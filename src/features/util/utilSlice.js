import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ModalContent: undefined,
  ModalData: undefined,
  isModal: false,
  filters: {
    Category: [],
    Area: [],
    Status: "all",
  },
  searchText: "",
};

export const utilSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setModalContent: (state, action) => {
      state.ModalContent = action.payload;
    },
    toggleModal: (state) => {
      state.isModal = !state.isModal;
    },
    setModalData: (state, action) => {
      state.ModalData = action.payload;
    },
    setFilter: (state, action) => {
      if (action.payload.type === "Status") {
        state.filters["Status"] = action.payload.value;
      } else {
        state.filters[action.payload.type].push(action.payload.value);
      }
    },
    removeFilter: (state, action) => {
      state.filters[action.payload.type] = state.filters[
        action.payload.type
      ].filter((filter) => {
        return filter !== action.payload.value;
      });
    },
    clearFilter: (state, action) => {
      state.filters[action.payload.type] = [];
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setModalContent,
  toggleModal,
  setModalData,
  setFilter,
  removeFilter,
  clearFilter,
  setSearchText,
} = utilSlice.actions;
export default utilSlice.reducer;
