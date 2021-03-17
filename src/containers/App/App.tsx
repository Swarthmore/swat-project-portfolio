/**
 * @description
 * 
 * This component is the root-level component for the application
 * 
 */

import * as React from "react";
import firebase from "firebase/app";
import { rrfConfig } from "../../config";
import { createFirestoreInstance } from "redux-firestore";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import {BrowserRouter, HashRouter} from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from "./styles";
import Props from "./props";
import { MuiTheme } from "../../theme";

export default function App({ store, routes }: Props) {

    const classes = styles();

    // react-redux-firebase props
    const rrfProps = {
        firebase,
        config: rrfConfig,
        dispatch: store.dispatch,
        createFirestoreInstance
    }

    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <ThemeProvider theme={MuiTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <HashRouter>
                            <CssBaseline/>
                            {routes}
                        </HashRouter>
                    </MuiPickersUtilsProvider> 
                </ThemeProvider>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}