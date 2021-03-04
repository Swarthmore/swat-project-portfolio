import * as React from "react";
import { useFirebase } from "react-redux-firebase";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { appConfig } from "../../config";
import styles from "./styles";

export default function LoginCard() {

    const firebase = useFirebase();
    const classes = styles();
    
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