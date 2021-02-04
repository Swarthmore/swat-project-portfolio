/**
 * @description
 * 
 * This component provides a login card that when clicked, will allow
 * a user to login to their Google account.
 * 
 */

import * as React from "react";
import { useFirebase } from "react-redux-firebase";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { appConfig } from "../../config";
import { useStyles } from "./useStyles";

export default function LoginCard() {

    const firebase = useFirebase();
    const classes = useStyles();
    
    function loginWithGoogle() {
        return firebase.login({ provider: "google", type: "popup" })
    }

    return (
        <Card className={classes.root}>
            <CardHeader 
                title={appConfig.name}
            />
            <CardContent>
                <Button color="primary" fullWidth variant="contained" onClick={loginWithGoogle}>Sign in with Google</Button>
            </CardContent>
        </Card>
    )

}