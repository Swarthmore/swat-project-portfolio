import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import {isLoaded, useFirebase} from "react-redux-firebase";
import {useHistory} from "react-router-dom";
import useSnax from "../../hooks/useSnax";

export default function AuthIsLoaded({ children }: { children: JSX.Element }) {
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const firebase = useFirebase();
    const history = useHistory();
    const {setSnack} = useSnax();

    if (!isLoaded(auth)) {
        return <>Loading...</>
    }

    // if auth.email exists, and is not part of the swarthmore domain, log the user out
    if (isLoaded(auth) && auth.email) {
        if (!(/@swarthmore.edu\s*$/.test(auth.email))) {
            firebase.logout().then(() => {
                setSnack({ type: "error", msg: "User email must be part of the @swarthmore.edu domain", open: true })
                history.push("/");
            });
        }
    }

    return children;
}