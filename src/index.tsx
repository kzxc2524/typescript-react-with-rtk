import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { hydrate, render } from "react-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(<App />);

// const rootElement = document.getElementById("root");
// if ((rootElement as Element).hasChildNodes()) {
//   hydrate(<App />, rootElement);
// } else {
//   render(<App />, rootElement);
// }
