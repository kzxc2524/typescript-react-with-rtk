import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cityData {
  code: string;
  name: string;
}

const initialState: cityData | null = null;

const value = { value: initialState as cityData | null }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const soldOutFilterSlice = createSlice({
  name: "soldOutFilter",
  initialState: value,
  reducers: {
    changeSoldOutValue: (state, action: PayloadAction<cityData | null>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { changeSoldOutValue } = soldOutFilterSlice.actions;
export default soldOutFilterSlice.reducer;
