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
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AddProjectPage from "./components/AddProjectPage/AddProjectPage";
import SingleProjectPage from "./components/SingleProjectPage/SingleProjectPage";
import SideMenu from "./components/SideMenu/SideMenu";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    }
}));

// react-redux-firebase props
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default function App() {

    const classes = useStyles();

    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <BrowserRouter>
                        <CssBaseline/>
                        <Navbar />
                        <div className={classes.root}>
                            <SideMenu onSelect={console.log} />
                            <div className={classes.content}>
                                <Switch>
                                    <Route exact path="/" component={LandingPage} />
                                    <Route exact path="/projects/add" component={AddProjectPage} /> 
                                    <Route path="/projects/:id" component={SingleProjectPage} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </MuiPickersUtilsProvider>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
}