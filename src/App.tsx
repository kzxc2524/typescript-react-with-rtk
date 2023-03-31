import React, { useEffect } from "react";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { store } from "./stores/store";

import { CssBaseline } from "@mui/material";

import AppRouter from "@/AppRouter";

import "../src/css/common.scss";

const persistor = persistStore(store);

import { styled } from "@mui/material/styles";

import variables from "@/css/_variables.module.scss";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};
export default App;
