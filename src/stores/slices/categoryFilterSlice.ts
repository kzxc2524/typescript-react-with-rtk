import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface searchTableFilter {
  value: string[];
  list: string[];
}

const initialState: searchTableFilter = {
  value: [],
  list: [],
};

const value = { category: initialState }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const categoryFilterSlice = createSlice({
  name: "searchtableFilter",
  initialState: value,
  reducers: {
    changeCategoryValue: (state, action: PayloadAction<searchTableFilter>) => {
      //   state.category.value = action.payload;
      state.category.value = action.payload.value;
    },
    changeCategoryList: (state, action: PayloadAction<searchTableFilter>) => {
      //   state.category.list = action.payload;
      state.category.list = action.payload.list;
    },
  },
});

export const { changeCategoryValue, changeCategoryList } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;
