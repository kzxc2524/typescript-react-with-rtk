import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const value = { value: false }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const dataLoadingSlice = createSlice({
  name: "dataLoading",
  initialState: value,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeLoading } = dataLoadingSlice.actions;
export default dataLoadingSlice.reducer;
