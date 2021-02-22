/**
 * @description
 * 
 * This file contains the main navbar for the app. It will appear on the top of the page.
 * 
 */

import * as React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../../reducer";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useStyles } from "./useStyles";
import { appConfig } from "../../config";
import { useHistory } from "react-router-dom";

export default function Navbar() {

    const auth = useSelector((state: RootState) => state.firebase.auth)
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button className={classes.title} onClick={() => history.push("/")} color="inherit">{appConfig.name}</Button>
                {/* Display the logout button if the user is logged in */}
                {isLoaded(auth) && !isEmpty(auth) && <LogoutButton />}
            </Toolbar>
        </AppBar>
    )

}