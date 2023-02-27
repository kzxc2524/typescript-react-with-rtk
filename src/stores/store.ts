import { configureStore } from "@reduxjs/toolkit";

import counterSliceReducer from "./slices/counterSlice";
import drawerAnchorSlice from "./slices/drawerAnchorSlice";

export const store = configureStore({
  reducer: { counter: counterSliceReducer, drawer: drawerAnchorSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
