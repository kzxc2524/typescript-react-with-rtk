import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./stores/store";

import { CssBaseline } from "@mui/material";

import AppRouter from "@/AppRouter";

import "../src/css/common.scss";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};
export default App;
