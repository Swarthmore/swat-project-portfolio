import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./store/store";
import createRoutes from "./routes";
import {version} from "../package.json";
import {appConfig} from "./config";
import App from "./containers/App";
import "./global.css";

const target = document.getElementById("root");
ReactDOM.render(<App store={store} routes={createRoutes()} />, target);

// change the title
const title = [appConfig.name, version].join(" ");
window.document.title = title;

