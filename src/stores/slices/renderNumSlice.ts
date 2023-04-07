import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: number = 0;

const value = { value: initialState }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const renderNumSlice = createSlice({
  name: "renderNum",
  initialState: value,
  reducers: {
    changeRenderNum: (state, action: PayloadAction<number>) => {
      //   state.category.value = action.payload;
      state.value = action.payload;
    },
  },
});

export const { changeRenderNum } = renderNumSlice.actions;
export default renderNumSlice.reducer;
