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
                <CssBaseline/>
                <h1>Hello world</h1>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}