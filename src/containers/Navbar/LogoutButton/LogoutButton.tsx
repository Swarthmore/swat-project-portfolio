/**
 * @description
 * 
 * This component provides a styled logout button that when clicked
 * will log the user out of the app. This should destroy session/cookie
 * data for the user.
 * 
 */

import * as React from "react";
import { useFirebase } from "react-redux-firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";

export default function LogoutButton() {

    const firebase = useFirebase();
    const history = useHistory();

    function onClick() {
        firebase.logout().then(() => {
            history.push("/");
        });
    }

    return (
        <Tooltip title="Logout of app">
            <IconButton color="inherit" aria-label="Logout of app" component="span" onClick={onClick}>
                <ExitToAppIcon />
            </IconButton>
        </Tooltip>      
    )

}