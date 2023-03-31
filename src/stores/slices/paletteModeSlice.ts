import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type mode = "dark" | "light" | "system";

const initialState = "light";

const value: { value: mode } = { value: initialState };

const paletteModeSlice = createSlice({
  name: "paletteMode",
  initialState: value,
  reducers: {
    changePaletteMode: (state, action: PayloadAction<mode>) => {
      state.value = action.payload;
    },
  },
});

export const { changePaletteMode } = paletteModeSlice.actions;
export default paletteModeSlice.reducer;
