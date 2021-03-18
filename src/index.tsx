import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./store/store";
import createRoutes from "./routes";

import App from "./containers/App";
import "./global.css";

const target = document.getElementById("root");
ReactDOM.render(<App store={store} routes={createRoutes()} />, target);
