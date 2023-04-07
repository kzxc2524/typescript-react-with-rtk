import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localStorage 직접 삭제 필요
import storageSession from "redux-persist/lib/storage/session"; //sessionStorage 브라우저 탭 종료시 삭제

import counterSliceReducer from "./slices/counterSlice";
import drawerAnchorSlice from "./slices/drawerAnchorSlice";
import dataSlice from "./slices/dataSlice";
import categoryFilterSlice from "./slices/categoryFilterSlice";
import soldOutFilterSlice from "./slices/soldOutFilterSlice";
import citiesListFilterSlice from "./slices/citiesListFilterSlice";
import citiesValueFilterSlice from "./slices/citiesValueFilterSlice";
import priceValueFilterSlice from "./slices/priceValueFilterSlice";
import searchInputValueSlice from "./slices/searchInputValueSlice";
import filterToggleSlice from "./slices/filterToggleSlice";
import dataLoadingSlice from "./slices/dataLoadingSlice";
import paletteModeSlice from "./slices/paletteModeSlice";
import themeModeSlice from "./slices/themeModeSlice";
import renderNumSlice from "./slices/renderNumSlice";

const rootReducer = combineReducers({
  counter: counterSliceReducer,
  drawerAnchor: drawerAnchorSlice,
  rowData: dataSlice,
  categoryFilter: categoryFilterSlice,
  soldOutFilter: soldOutFilterSlice,
  citiesListFilter: citiesListFilterSlice,
  citiesValueFilter: citiesValueFilterSlice,
  priceValueFilter: priceValueFilterSlice,
  searchInputValue: searchInputValueSlice,
  filterToggle: filterToggleSlice,
  dataLoading: dataLoadingSlice,
  paletteMode: paletteModeSlice,
  themeMode: themeModeSlice,
  renderNum: renderNumSlice,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["rowData", "paletteMode", "themeMode"], // 해당 reducer만 저장
  // blacklist: [''] // 해당 reducer만 제외
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // A non-serializable value was detected in an action , RTK 에러 해결법
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
