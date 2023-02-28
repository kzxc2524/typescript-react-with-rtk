import React from "react";
import { Provider } from "react-redux";
import { store } from "./stores/store";

import { CssBaseline } from "@mui/material";

import Main from "./pages/Main";

import "../src/css/common.scss";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Main></Main>
    </Provider>
  );
};
export default App;
