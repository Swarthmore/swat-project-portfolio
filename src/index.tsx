/**
 * @description
 * 
 * This file is the main entry point to the application
 * 
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./global.css";

const node = document.getElementById("app");
ReactDOM.render(<App />, node);
