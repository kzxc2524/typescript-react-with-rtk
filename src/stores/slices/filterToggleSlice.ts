import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const value = { value: false }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const filterToggleSlice = createSlice({
  name: "filterToggle",
  initialState: value,
  reducers: {
    changeFilterToggle: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeFilterToggle } = filterToggleSlice.actions;
export default filterToggleSlice.reducer;
