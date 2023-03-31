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
      let oldData = action.payload;
      if (!oldData.length) {
        // params.api!.showNoRowsOverlay();
        return;
      }

      let newData = oldData.reduce((acc, curr, idx) => {
        let duplIdx = acc.findIndex(({ name, price, soldOut }) => {
          return [name.replace(/\[[^\]]*\]\s*/g, ""), price, soldOut].every((elem) => {
            return [curr.name.replace(/\[[^\]]*\]\s*/g, ""), curr.price, curr.soldOut].includes(elem);
          });
        });

        if (duplIdx === -1) {
          acc = [...acc, curr];
        } else {
          let regionStr = acc[duplIdx].region + "," + curr.region;
          let cateStr = acc[duplIdx].category + "," + curr.category;

          acc[duplIdx] = {
            ...acc[duplIdx],
            region: Array.from(new Set(regionStr.split(","))).join(","),
            category: Array.from(new Set(cateStr.split(","))).join(","),
          };
        }

        return acc;
      }, [] as GoodsData[]);

      // let newData = action.payload;

      state.value = newData;
      state.filtered = newData;
    },
    filter: (state, action: PayloadAction<GoodsData[]>) => {
      state.filtered = action.payload;
    },
  },
});

export const { init, filter } = dataSlice.actions;
export default dataSlice.reducer;
