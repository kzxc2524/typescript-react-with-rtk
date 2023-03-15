import { combineReducers, configureStore } from "@reduxjs/toolkit";

import counterSliceReducer from "./slices/counterSlice";
import drawerAnchorSlice from "./slices/drawerAnchorSlice";
import dataSlice from "./slices/dataSlice";
import categoryFilterSlice from "./slices/categoryFilterSlice";
import soldOutFilterSlice from "./slices/soldOutFilterSlice";
import citiesListFilterSlice from "./slices/citiesListFilterSlice";
import citiesValueFilterSlice from "./slices/citiesValueFilterSlice";
import priceValueFilterSlice from "./slices/priceValueFilterSlice";
import searchInputValueSlice from "./slices/searchInputValueSlice";

const rootReducer = combineReducers({
  counter: counterSliceReducer,
  drawer: drawerAnchorSlice,
  rowData: dataSlice,
  categoryFilter: categoryFilterSlice,
  soldOutFilter: soldOutFilterSlice,
  citiesListFilter: citiesListFilterSlice,
  citiesValueFilter: citiesValueFilterSlice,
  priceValueFilter: priceValueFilterSlice,
  searchInputValue: searchInputValueSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
