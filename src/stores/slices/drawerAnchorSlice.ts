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
  left: true,
  bottom: false,
  right: false,
};

const value = { value: initialState }; // 한 번 더 깜싸주지 않으면 최신 상태가 반영 되지 않음

const drawerAnchorSlice = createSlice({
  name: "drawerAnchor",
  initialState: value,
  reducers: {
    open: (state, action: PayloadAction<anchorState>) => {
      console.log(state, action);
      state.value = action.payload;
    },
    close: (state, action: PayloadAction<anchorState>) => {
      state.value = action.payload;
    },
  },
});

export const { open, close } = drawerAnchorSlice.actions;
export default drawerAnchorSlice.reducer;

// type Anchor = "top" | "left" | "bottom" | "right";

// const drawerAnchorSlice = createSlice({
//   name: "drawerAnchorSlice",
//   initialState: {
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   },
//   reducers: {
//     open: (state, action) => (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
//         return;
//       }
//       state[]
//     },
//   },
// });

// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// interface CounterState {
//   value: number;
// }

// const initialState: CounterState = { value: 0 };

// const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state, action: PayloadAction<CounterState>) => {
//       console.log(state, action);
//       state.value++;
//     },
//     decrement(state, action: PayloadAction<number>) {
//       state.value--;
//     },
//     incrementByAmount(state, action: PayloadAction<number>) {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export default counterSlice.reducer;
