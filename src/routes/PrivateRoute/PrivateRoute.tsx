import React from 'react'
import {
    Route,
    Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import {RootState} from "../../store/reducer";

export default function PrivateRoute({ children, ...rest }: { children: JSX.Element }) {
    const auth = useSelector((state: RootState) => state.firebase.auth);

    return (
        <Route
            {...rest}
            render={
                () =>
                    (isLoaded(auth) && !isEmpty(auth))
                        ? children
                        : <Redirect to="/login" />
            }
        />
    );

}