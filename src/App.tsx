import React from "react";
import { Provider } from "react-redux";
import { store } from "./stores/store";

import Main from "./pages/Main";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello Type Scipt World!!!</h1>
      </div>
      <Main />
    </Provider>
  );
};
export default App;
