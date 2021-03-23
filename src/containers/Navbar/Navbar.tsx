/**
 * @description
 * 
 * This file contains the main navbar for the app. It will appear on the top of the page.
 * 
 */

import * as React from "react";
import { AppBar, Link, Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { RootState } from "../../store/reducer";
import LogoutButton from "./LogoutButton/LogoutButton";
import ProfileButton from "./ProfileButton/ProfileButton";
import styles from "./styles";
import { appConfig } from "../../config";
import { useHistory } from "react-router-dom";

export default function Navbar() {

    const auth = useSelector((state: RootState) => state.firebase.auth)
    const classes = styles();
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit" onClick={() => history.push("/")}>{appConfig.name}</Typography>
                {/* Display the logout button if the user is logged in */}
                {isLoaded(auth) && !isEmpty(auth) && <ProfileButton />}
                {isLoaded(auth) && !isEmpty(auth) && <LogoutButton />}
            </Toolbar>
        </AppBar>
    );

}