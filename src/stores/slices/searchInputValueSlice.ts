import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const value = { value: initialState }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const searchInputValueSlice = createSlice({
  name: "searchInputValue",
  initialState: value,
  reducers: {
    changeSearchInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeSearchInputValue } = searchInputValueSlice.actions;
export default searchInputValueSlice.reducer;
