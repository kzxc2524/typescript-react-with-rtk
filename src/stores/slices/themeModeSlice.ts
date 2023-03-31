import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type mode = "dark" | "light";

const initialState = "light";

const value: { value: mode } = { value: initialState };

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: value,
  reducers: {
    changeThemeMode: (state, action: PayloadAction<mode>) => {
      state.value = action.payload;
    },
  },
});

export const { changeThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
