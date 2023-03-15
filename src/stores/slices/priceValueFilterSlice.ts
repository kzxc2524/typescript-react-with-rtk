import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface price {
  max: string;
  min: string;
}

const price: price = { max: "", min: "" };

const value = { value: price }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const priceValueFilterSlice = createSlice({
  name: "priceValueFilter",
  initialState: value,
  reducers: {
    changePriceValue: (state, action: PayloadAction<price>) => {
      //   state.state.list = action.payload;
      state.value = action.payload;
    },
  },
});

export const { changePriceValue } = priceValueFilterSlice.actions;
export default priceValueFilterSlice.reducer;
