import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface anchorState {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

const initialState: anchorState = {
  top: false,
  left: false,
  bottom: false,
  right: false,
};

const value = { value: initialState }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const drawerAnchorSlice = createSlice({
  name: "drawerAnchor",
  initialState: value,
  reducers: {
    chanageDrawer: (state, action: PayloadAction<anchorState>) => {
      state.value = action.payload;
    },
  },
});

export const { chanageDrawer } = drawerAnchorSlice.actions;
export default drawerAnchorSlice.reducer;
