/**
 * @description
 * 
 * This component is the root-level component for the application
 * 
 */

import * as React from "react";
import firebase from "firebase/app";
import { rrfConfig } from "./config";
import { store } from "./store";
import { createFirestoreInstance } from "redux-firestore";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { CssBaseline } from "@material-ui/core";
import LandingPage from "./components/LandingPage/LandingPage";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// react-redux-firebase props
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <BrowserRouter>
                    <CssBaseline/>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                    </Switch>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}