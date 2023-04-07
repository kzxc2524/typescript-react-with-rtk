import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cityData {
  code: string;
  name: string;
}

interface cityValueObject {
  state: cityData | null;
  region: cityData | null;
  district: cityData | null;
}

const cityValue: cityValueObject = {
  state: null,
  region: null,
  district: null,
};

const value = { value: cityValue }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const citiesValueFilterSlice = createSlice({
  name: "citiesValueFilter",
  initialState: value,
  reducers: {
    changeCitiesValue: (state, action: PayloadAction<cityValueObject>) => {
      // console.log("changeCitiesValue", action.payload);
      state.value = action.payload;
    },
  },
});

export const { changeCitiesValue } = citiesValueFilterSlice.actions;
export default citiesValueFilterSlice.reducer;
