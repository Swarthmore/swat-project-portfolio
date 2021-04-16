import * as React from "react";
import firebase from "firebase/app";
import { rrfConfig } from "../../config";
import { createFirestoreInstance } from "redux-firestore";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { CssBaseline } from "@material-ui/core";
import {HashRouter} from "react-router-dom";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Props from "./props";
import SnackbarProvider from "../../contexts/Snackbar";
import {DarkModeProvider} from "../../contexts/DarkMode";
import {ThemeProvider} from "../../theme";

export default function App({ store, routes }: Props) {

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
                <DarkModeProvider>
                    <ThemeProvider>
                        <SnackbarProvider>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <HashRouter>
                                    <CssBaseline/>
                                    {routes}
                                </HashRouter>
                            </MuiPickersUtilsProvider>
                        </SnackbarProvider>
                    </ThemeProvider>
                </DarkModeProvider>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}