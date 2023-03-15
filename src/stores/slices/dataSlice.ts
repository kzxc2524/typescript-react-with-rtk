import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GoodsData {
  category: string | string[];
  state: string;
  region: string;
  image: string;
  link: string;
  name: string;
  price: string;
  soldOut: boolean;
  taxType: string;
}

interface initialState {
  value: GoodsData[] | undefined;
  filtered: GoodsData[] | undefined;
}

const initialState: initialState = { value: [], filtered: [] };

const dataSlice = createSlice({
  name: "rowData",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<GoodsData[]>) => {
      let newData = action.payload;

      state.value = newData;
      state.filtered = newData;
    },
    filter: (state, action: PayloadAction<GoodsData[]>) => {
      console.log("dataSlice filter", action.payload);
      state.filtered = action.payload;
    },
  },
});

export const { init, filter } = dataSlice.actions;
export default dataSlice.reducer;
