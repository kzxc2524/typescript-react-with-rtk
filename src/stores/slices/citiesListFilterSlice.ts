import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cityData {
  code: string;
  name: string;
}

interface cityValue {
  state: string;
  region: string;
}

interface cityList {
  state: cityData[];
  region: cityData[];
  district: cityData[];
}

const cityList: cityList = {
  state: [],
  region: [],
  district: [],
};

const value = { value: cityList }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const citiesListFilterSlice = createSlice({
  name: "citiesListFilter",
  initialState: value,
  reducers: {
    changeCitiesList: (state, action: PayloadAction<cityList>) => {
      //   state.state.list = action.payload;
      state.value = action.payload;
    },
  },
});

export const { changeCitiesList } = citiesListFilterSlice.actions;
export default citiesListFilterSlice.reducer;
