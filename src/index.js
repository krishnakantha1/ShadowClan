import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

import { LoginProvider } from "./Context/loginContext";

import "./App.css";

ReactDOM.render(
  <LoginProvider>
    <App />
  </LoginProvider>,
  document.getElementById("root")
);
